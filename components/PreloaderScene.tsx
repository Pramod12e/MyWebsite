"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Progress = React.RefObject<number>;
type Shared = { progress: Progress; exiting: React.RefObject<boolean> };
type Side = "human" | "ai";
type Pose = number[];
type Vec3 = [number, number, number];

type Rig = {
  root: THREE.Group | null;
  hips: THREE.Group | null;
  torso: THREE.Group | null;
  head: THREE.Group | null;
  armF: THREE.Group | null;
  foreF: THREE.Group | null;
  armB: THREE.Group | null;
  foreB: THREE.Group | null;
  legF: THREE.Group | null;
  shinF: THREE.Group | null;
  legB: THREE.Group | null;
  shinB: THREE.Group | null;
  handF: THREE.Group | null;
  handB: THREE.Group | null;
  footF: THREE.Group | null;
  eye: THREE.MeshBasicMaterial | null;
};
type Rigs = Record<Side, Rig>;
type RigPart = Exclude<keyof Rig, "eye">;

type Fx = {
  emit: (x: number, y: number, z: number, n: number, speed: number, col: number, up?: number) => void;
  flash: (x: number, y: number, z: number, size: number, col: number) => void;
  shake: number;
};

const emptyRig = (): Rig => ({
  root: null, hips: null, torso: null, head: null,
  armF: null, foreF: null, armB: null, foreB: null,
  legF: null, shinF: null, legB: null, shinB: null,
  handF: null, handB: null, footF: null, eye: null,
});

/* ---------- Constants ---------- */

const HUMAN = "#fbbf24";
const AI = "#22d3ee";
const EYE_RED = new THREE.Color("#ef4444");
const EYE_CYAN = new THREE.Color("#67e8f9");

const TORSO = 0.85;
const UPPER = 0.55;
const FORE = 0.55;
const THIGH = 0.62;
const SHIN = 0.62;
const BEAT = 0.85; // seconds per exchange

// Pose = [dx, air, lean, headTilt, armF s/e, armB s/e, legF hip/knee, legB hip/knee]
// Arm and hip angles: 0 = hanging down, positive = swinging forward.
// Knee angles are negative (shin bends backward).
const GUARD: Pose = [0, 0, 0.12, 0.05, 0.9, 1.7, 0.7, 1.9, 0.45, -0.55, -0.35, -0.5];
const JAB_WIND: Pose = [-0.05, 0, 0, 0, 0.5, 2.2, 0.7, 1.9, 0.45, -0.6, -0.4, -0.5];
const JAB_STRIKE: Pose = [0.35, 0, 0.3, 0.05, 1.5, 0.05, 0.7, 1.9, 0.7, -0.5, -0.5, -0.4];
const CROSS_WIND: Pose = [-0.1, 0, -0.12, -0.02, 0.9, 1.7, -0.6, 2.3, 0.3, -0.6, -0.5, -0.6];
const CROSS_STRIKE: Pose = [0.55, 0, 0.5, 0.1, 0.9, 1.9, 1.5, 0.05, 0.75, -0.4, -0.7, -0.2];
const KICK_WIND: Pose = [-0.1, 0, -0.2, -0.05, 0.9, 1.7, 0.7, 1.9, 0.9, -1.5, -0.2, -0.2];
const KICK_STRIKE: Pose = [0.45, 0, -0.3, -0.05, 0.4, 1.9, 1.1, 1.5, 1.55, -0.05, -0.1, -0.15];
const HIT: Pose = [-0.45, 0.1, -0.45, -0.5, -0.3, 0.6, -0.5, 0.8, -0.2, -0.2, -0.6, -0.3];
const BLOCK: Pose = [-0.08, 0, 0.1, 0.1, 1.2, 2.3, 1.1, 2.4, 0.4, -0.6, -0.4, -0.5];
const DODGE: Pose = [-0.3, 0, -0.5, -0.2, 0.9, 1.7, 0.7, 1.9, 0.8, -0.9, -0.5, -0.6];
const RELAX: Pose = [0, 0, 0.03, 0.05, 0.12, 0.25, 0.1, 0.3, 0.08, -0.08, -0.05, -0.05];
const HANDSHAKE: Pose = [0, 0, 0.05, 0.05, 1.45, 0.12, 0.1, 0.3, 0.08, -0.08, -0.05, -0.05];

const MOVES = {
  jab: { wind: JAB_WIND, strike: JAB_STRIKE, end: "handF" },
  cross: { wind: CROSS_WIND, strike: CROSS_STRIKE, end: "handB" },
  kick: { wind: KICK_WIND, strike: KICK_STRIKE, end: "footF" },
} as const;

type Beat = { a: Side; move: keyof typeof MOVES; r: "hit" | "block" | "dodge" };

const FIGHT: Beat[] = [
  { a: "human", move: "jab", r: "block" },
  { a: "ai", move: "cross", r: "dodge" },
  { a: "human", move: "kick", r: "hit" },
  { a: "ai", move: "jab", r: "hit" },
  { a: "human", move: "cross", r: "hit" },
  { a: "ai", move: "kick", r: "block" },
  { a: "human", move: "jab", r: "hit" },
  { a: "ai", move: "cross", r: "hit" },
];

const fightP: Pose = new Array(12).fill(0);
const peaceP: Pose = new Array(12).fill(0);
const finalP: Pose = new Array(12).fill(0);

/* ---------- Helpers ---------- */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function copyPose(out: Pose, a: Pose) {
  for (let i = 0; i < 12; i++) out[i] = a[i];
}

function mix(out: Pose, a: Pose, b: Pose, k: number) {
  for (let i = 0; i < 12; i++) out[i] = a[i] + (b[i] - a[i]) * k;
}

const legExtent = (h: number, k: number) =>
  THIGH * Math.cos(h) + SHIN * Math.cos(h + k);

function fightPose(out: Pose, side: Side, beat: Beat, u: number, t: number) {
  copyPose(out, GUARD);

  if (beat.a === side) {
    const m = MOVES[beat.move];
    if (u < 0.35) mix(out, GUARD, m.wind, smooth(0, 0.35, u));
    else if (u < 0.5) mix(out, m.wind, m.strike, smooth(0.35, 0.5, u));
    else if (u < 0.7) copyPose(out, m.strike);
    else mix(out, m.strike, GUARD, smooth(0.7, 1, u));
  } else {
    let target: Pose = GUARD;
    let w = 0;

    if (beat.r === "hit") {
      target = HIT;
      w = u < 0.5 ? 0 : u < 0.58 ? (u - 0.5) / 0.08 : Math.max(0, 1 - (u - 0.58) / 0.38);
    } else if (beat.r === "block") {
      target = BLOCK;
      w = smooth(0.2, 0.38, u) * (1 - smooth(0.72, 0.95, u));
    } else {
      target = DODGE;
      w = smooth(0.28, 0.44, u) * (1 - smooth(0.62, 0.85, u));
    }

    mix(out, GUARD, target, w);
    if (beat.r === "block") {
      out[0] -= 0.12 * Math.max(0, 1 - Math.abs(u - 0.55) / 0.15);
    }
  }

  const bob = Math.sin(t * 5 + (side === "ai" ? 1.7 : 0));
  out[2] += bob * 0.02;
  out[4] += bob * 0.05;
  out[6] -= bob * 0.05;
}

function applyPose(rig: Rig, pose: Pose, side: Side, s: number) {
  const dir = side === "human" ? -1 : 1;

  if (rig.root) rig.root.position.x = dir * s - dir * pose[0];
  if (rig.hips) {
    rig.hips.position.y =
      Math.max(legExtent(pose[8], pose[9]), legExtent(pose[10], pose[11])) + pose[1];
  }
  if (rig.torso) rig.torso.rotation.z = -pose[2];
  if (rig.head) rig.head.rotation.z = -pose[3];
  if (rig.armF) rig.armF.rotation.z = pose[4];
  if (rig.foreF) rig.foreF.rotation.z = pose[5];
  if (rig.armB) rig.armB.rotation.z = pose[6];
  if (rig.foreB) rig.foreB.rotation.z = pose[7];
  if (rig.legF) rig.legF.rotation.z = pose[8];
  if (rig.shinF) rig.shinF.rotation.z = pose[9];
  if (rig.legB) rig.legB.rotation.z = pose[10];
  if (rig.shinB) rig.shinB.rotation.z = pose[11];
}

function makeGlow(color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeChar(ch: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.font = '700 46px ui-monospace, Menlo, Consolas, monospace';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.fillText(ch, 32, 34);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- Silhouette body part: black fill + glowing outline ---------- */

function Part({
  geometry,
  color,
  position,
}: {
  geometry: THREE.BufferGeometry;
  color: string;
  position?: Vec3;
}) {
  return (
    <group position={position}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh geometry={geometry} scale={1.22}>
        <meshBasicMaterial color={color} side={THREE.BackSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- Fighter ---------- */

function Fighter({ side, rigs }: { side: Side; rigs: React.RefObject<Rigs> }) {
  const human = side === "human";
  const color = human ? HUMAN : AI;
  const zs = human ? 1 : -1; // keeps the "front" limbs on the camera side

  const set = (part: RigPart) => (el: THREE.Group | null) => {
    rigs.current[side][part] = el;
  };

  const g = useMemo<Record<string, THREE.BufferGeometry>>(
    () =>
      human
        ? {
            torso: new THREE.CapsuleGeometry(0.2, TORSO - 0.4, 4, 12),
            head: new THREE.SphereGeometry(0.21, 16, 12),
            upper: new THREE.CapsuleGeometry(0.075, UPPER - 0.15, 4, 8),
            fore: new THREE.CapsuleGeometry(0.065, FORE - 0.13, 4, 8),
            thigh: new THREE.CapsuleGeometry(0.1, THIGH - 0.2, 4, 8),
            shin: new THREE.CapsuleGeometry(0.08, SHIN - 0.16, 4, 8),
            hand: new THREE.SphereGeometry(0.085, 10, 8),
            foot: new THREE.BoxGeometry(0.3, 0.1, 0.14),
          }
        : {
            torso: new THREE.BoxGeometry(0.46, TORSO, 0.34),
            head: new THREE.BoxGeometry(0.34, 0.36, 0.32),
            upper: new THREE.BoxGeometry(0.15, UPPER, 0.15),
            fore: new THREE.BoxGeometry(0.13, FORE, 0.13),
            thigh: new THREE.BoxGeometry(0.2, THIGH, 0.2),
            shin: new THREE.BoxGeometry(0.16, SHIN, 0.16),
            hand: new THREE.BoxGeometry(0.17, 0.17, 0.17),
            foot: new THREE.BoxGeometry(0.3, 0.1, 0.14),
          },
    [human]
  );

  useEffect(() => {
    return () => Object.values(g).forEach((geometry) => geometry.dispose());
  }, [g]);

  const arm = (
    shoulder: "armF" | "armB",
    elbow: "foreF" | "foreB",
    hand: "handF" | "handB",
    z: number
  ) => (
    <group ref={set(shoulder)} position={[0, TORSO - 0.1, z * zs]}>
      <Part geometry={g.upper} color={color} position={[0, -UPPER / 2, 0]} />
      <group ref={set(elbow)} position={[0, -UPPER, 0]}>
        <Part geometry={g.fore} color={color} position={[0, -FORE / 2, 0]} />
        <group ref={set(hand)} position={[0, -FORE, 0]}>
          <Part geometry={g.hand} color={color} />
        </group>
      </group>
    </group>
  );

  const leg = (
    hip: "legF" | "legB",
    knee: "shinF" | "shinB",
    z: number,
    foot?: "footF"
  ) => (
    <group ref={set(hip)} position={[0, 0, z * zs]}>
      <Part geometry={g.thigh} color={color} position={[0, -THIGH / 2, 0]} />
      <group ref={set(knee)} position={[0, -THIGH, 0]}>
        <Part geometry={g.shin} color={color} position={[0, -SHIN / 2, 0]} />
        <group ref={foot ? set(foot) : undefined} position={[0, -SHIN, 0]}>
          <Part geometry={g.foot} color={color} position={[0.08, -0.03, 0]} />
        </group>
      </group>
    </group>
  );

  return (
    <group
      ref={set("root")}
      position={[human ? -0.95 : 0.95, 0, 0]}
      rotation={[0, human ? 0 : Math.PI, 0]}
    >
      <group ref={set("hips")} position={[0, 1.2, 0]}>
        {leg("legB", "shinB", -0.1)}
        {leg("legF", "shinF", 0.1, "footF")}

        <group ref={set("torso")}>
          <Part geometry={g.torso} color={color} position={[0, TORSO / 2, 0]} />

          {/* Chest core */}
          <mesh position={[0, 0.6, 0.2 * zs]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>

          <group ref={set("head")} position={[0, TORSO, 0]}>
            <Part geometry={g.head} color={color} position={[0, 0.2, 0]} />
            {!human && (
              <mesh position={[0.09, 0.22, 0.17 * zs]}>
                <boxGeometry args={[0.12, 0.045, 0.02]} />
                <meshBasicMaterial
                  ref={(m) => {
                    rigs.current.ai.eye = m;
                  }}
                  color="#ef4444"
                  toneMapped={false}
                />
              </mesh>
            )}
          </group>

          {arm("armB", "foreB", "handB", -0.16)}
          {arm("armF", "foreF", "handF", 0.16)}
        </group>
      </group>
    </group>
  );
}

/* ---------- Choreographer: fight, ceasefire, handshake ---------- */

function Choreographer({
  rigs,
  progress,
  fx,
}: {
  rigs: React.RefObject<Rigs>;
  progress: Progress;
  fx: React.RefObject<Fx>;
}) {
  const state = useRef({ beat: -1, fired: false, burst: false, leak: 0 });
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const p = progress.current;
    const st = state.current;

    const battle = 1 - smooth(0.5, 0.58, p);
    const approach = smooth(0.62, 0.84, p);
    const handshake = smooth(0.8, 0.88, p);
    const unity = smooth(0.9, 1, p);
    const walk = smooth(0.5, 0.54, p) * (1 - smooth(0.84, 0.87, p));
    const s = 0.95 + 1.05 * smooth(0.5, 0.62, p) - 0.9 * approach;

    const beatF = t / BEAT;
    const idx = Math.floor(beatF);
    const u = beatF - idx;
    const beat = FIGHT[idx % FIGHT.length];

    (["human", "ai"] as Side[]).forEach((side) => {
      fightPose(fightP, side, beat, u, t);

      mix(peaceP, RELAX, HANDSHAKE, handshake);
      const ph = t * 6.5;
      const sw = Math.sin(ph) * walk;
      peaceP[8] += sw * 0.5;
      peaceP[10] -= sw * 0.5;
      peaceP[9] -= 0.5 * Math.max(0, Math.sin(ph + 1.2)) * walk;
      peaceP[11] -= 0.5 * Math.max(0, -Math.sin(ph + 1.2)) * walk;
      peaceP[4] -= sw * 0.3 * (1 - handshake);
      peaceP[6] += sw * 0.3;

      mix(finalP, peaceP, fightP, battle);
      applyPose(rigs.current[side], finalP, side, s);

      const eye = rigs.current[side].eye;
      if (eye) eye.color.lerpColors(EYE_RED, EYE_CYAN, smooth(0.5, 0.7, p));
    });

    const f = fx.current;
    const attacker = rigs.current[beat.a];
    const endNode = attacker[MOVES[beat.move].end];
    const attackerCol = beat.a === "human" ? 0 : 1;

    if (idx !== st.beat) {
      st.beat = idx;
      st.fired = false;
    }

    // Trail of 0/1 behind the striking limb
    if (endNode && u >= 0.33 && u < 0.52 && battle > 0.4) {
      endNode.getWorldPosition(pos);
      f.emit(pos.x, pos.y, pos.z, 1, 0.4, attackerCol, 0.2);
    }

    // Impact
    if (!st.fired && u >= 0.5 && battle > 0.4) {
      st.fired = true;
      if (endNode) {
        endNode.getWorldPosition(pos);
        if (beat.r === "hit") {
          f.emit(pos.x, pos.y, pos.z, 36, 4.4, 3, 0.5);
          f.flash(pos.x, pos.y, pos.z, 3.4, 2);
          f.shake = Math.max(f.shake, 0.45);
        } else if (beat.r === "block") {
          f.emit(pos.x, pos.y, pos.z, 14, 2.6, 2, 0.4);
          f.flash(pos.x, pos.y, pos.z, 1.8, attackerCol);
          f.shake = Math.max(f.shake, 0.15);
        } else {
          f.emit(pos.x, pos.y, pos.z, 8, 1.6, attackerCol, 0.2);
        }
      }
    }

    // 0/1 leaking off both bodies
    st.leak += delta * 16 * (battle * 0.8 + unity * 0.6);
    while (st.leak >= 1) {
      st.leak -= 1;
      const side: Side = Math.random() < 0.5 ? "human" : "ai";
      const root = rigs.current[side].root;
      if (root) {
        f.emit(
          root.position.x + (Math.random() - 0.5) * 0.5,
          0.7 + Math.random() * 1.7,
          (Math.random() - 0.5) * 0.3,
          1,
          0.9,
          side === "human" ? 0 : 1,
          1.2
        );
      }
    }

    // Handshake burst
    if (!st.burst && p >= 0.88) {
      st.burst = true;
      const hand = rigs.current.human.handF;
      if (hand) {
        hand.getWorldPosition(pos);
        f.emit(pos.x, pos.y, pos.z, 70, 3.6, 2, 0.3);
        f.flash(pos.x, pos.y, pos.z, 7, 2);
        f.shake = Math.max(f.shake, 0.1);
      }
    }
  });

  return null;
}

/* ---------- 0/1 particles and impact flashes ---------- */

const CHAR_COLORS = ["#fbbf24", "#67e8f9", "#ffffff"];
const FLASHES = 6;

function FxLayer({ fx, count }: { fx: React.RefObject<Fx>; count: number }) {
  const sprites = useRef<(THREE.Sprite | null)[]>([]);
  const flashes = useRef<(THREE.Sprite | null)[]>([]);

  const charTex = useMemo(
    () => CHAR_COLORS.flatMap((c) => ["0", "1"].map((ch) => makeChar(ch, c))),
    []
  );
  const glowTex = useMemo(
    () => [
      makeGlow("rgba(251,191,36,1)"),
      makeGlow("rgba(34,211,238,1)"),
      makeGlow("rgba(255,255,255,1)"),
    ],
    []
  );

  const st = useMemo(
    () => ({
      vel: new Float32Array(count * 3),
      age: new Float32Array(count).fill(99),
      life: new Float32Array(count).fill(1),
      size: new Float32Array(count),
      fAge: new Float32Array(FLASHES).fill(99),
      fLife: new Float32Array(FLASHES).fill(1),
      fSize: new Float32Array(FLASHES),
    }),
    [count]
  );

  useEffect(() => {
    return () => {
      charTex.forEach((texture) => texture.dispose());
      glowTex.forEach((texture) => texture.dispose());
    };
  }, [charTex, glowTex]);

  useEffect(() => {
    let cursor = 0;

    fx.current.emit = (x, y, z, n, speed, col, up = 0.5) => {
      for (let k = 0; k < n; k++) {
        let i = cursor;
        for (let j = 0; j < count; j++) {
          const c = (cursor + j) % count;
          if (st.age[c] >= st.life[c]) {
            i = c;
            break;
          }
        }
        cursor = (i + 1) % count;

        const sprite = sprites.current[i];
        if (!sprite) continue;

        const a = Math.random() * Math.PI * 2;
        const r = Math.random();
        st.vel[i * 3] = Math.cos(a) * speed * r;
        st.vel[i * 3 + 1] = (Math.random() * 0.8 + up) * speed * 0.7;
        st.vel[i * 3 + 2] = Math.sin(a) * speed * 0.4 * r;
        st.age[i] = 0;
        st.life[i] = 0.8 + Math.random() * 1.0;
        st.size[i] = 0.3 + Math.random() * 0.3;

        const colour = col === 3 ? Math.floor(Math.random() * 3) : col;
        (sprite.material as THREE.SpriteMaterial).map =
          charTex[colour * 2 + (Math.random() < 0.5 ? 0 : 1)];
        sprite.position.set(
          x + (Math.random() - 0.5) * 0.15,
          y + (Math.random() - 0.5) * 0.15,
          z
        );
        sprite.visible = true;
      }
    };

    fx.current.flash = (x, y, z, size, col) => {
      let f = 0;
      for (let j = 0; j < FLASHES; j++) {
        if (st.fAge[j] >= st.fLife[j]) {
          f = j;
          break;
        }
      }
      const sprite = flashes.current[f];
      if (!sprite) return;
      st.fAge[f] = 0;
      st.fLife[f] = 0.35;
      st.fSize[f] = size;
      (sprite.material as THREE.SpriteMaterial).map = glowTex[col];
      sprite.position.set(x, y, z + 0.3);
      sprite.visible = true;
    };
  }, [fx, count, st, charTex, glowTex]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const drag = Math.exp(-1.6 * dt);

    for (let i = 0; i < count; i++) {
      const sprite = sprites.current[i];
      if (!sprite) continue;

      if (st.age[i] >= st.life[i]) {
        if (sprite.visible) sprite.visible = false;
        continue;
      }

      st.age[i] += dt;
      const k = Math.max(0, 1 - st.age[i] / st.life[i]);

      sprite.position.x += st.vel[i * 3] * dt;
      sprite.position.y += st.vel[i * 3 + 1] * dt;
      sprite.position.z += st.vel[i * 3 + 2] * dt;
      st.vel[i * 3] *= drag;
      st.vel[i * 3 + 1] = st.vel[i * 3 + 1] * drag + 0.9 * dt;
      st.vel[i * 3 + 2] *= drag;

      (sprite.material as THREE.SpriteMaterial).opacity = Math.pow(k, 1.2);
      sprite.scale.setScalar(st.size[i] * (0.55 + 0.45 * k));
    }

    for (let f = 0; f < FLASHES; f++) {
      const sprite = flashes.current[f];
      if (!sprite) continue;

      if (st.fAge[f] >= st.fLife[f]) {
        if (sprite.visible) sprite.visible = false;
        continue;
      }

      st.fAge[f] += dt;
      const k = Math.max(0, 1 - st.fAge[f] / st.fLife[f]);
      (sprite.material as THREE.SpriteMaterial).opacity = k * k;
      sprite.scale.setScalar(st.fSize[f] * (1 + (1 - k) * 0.8));
    }
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <sprite
          key={`c${i}`}
          ref={(el) => {
            sprites.current[i] = el;
          }}
          visible={false}
        >
          <spriteMaterial
            map={charTex[0]}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
            fog={false}
          />
        </sprite>
      ))}
      {Array.from({ length: FLASHES }, (_, i) => (
        <sprite
          key={`f${i}`}
          ref={(el) => {
            flashes.current[i] = el;
          }}
          visible={false}
        >
          <spriteMaterial
            map={glowTex[2]}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
            fog={false}
          />
        </sprite>
      ))}
    </>
  );
}

/* ---------- Backlight behind the silhouettes ---------- */

function Backlight({
  rigs,
  progress,
}: {
  rigs: React.RefObject<Rigs>;
  progress: Progress;
}) {
  const refs = useRef<(THREE.Sprite | null)[]>([]);
  const tex = useMemo(
    () => [
      makeGlow("rgba(251,146,60,0.95)"),
      makeGlow("rgba(34,211,238,0.9)"),
      makeGlow("rgba(255,255,255,0.9)"),
    ],
    []
  );

  useEffect(() => {
    return () => tex.forEach((texture) => texture.dispose());
  }, [tex]);

  useFrame(({ clock }) => {
    const [h, a, w] = refs.current;
    const t = clock.elapsedTime;
    const p = progress.current;
    const battle = 1 - smooth(0.5, 0.58, p);
    const unity = smooth(0.86, 0.97, p);
    const hr = rigs.current.human.root;
    const ar = rigs.current.ai.root;

    if (h && hr) {
      h.position.set(hr.position.x - 0.2, 1.4, -2);
      h.scale.setScalar(8.5 + Math.sin(t * 9) * 0.3 * battle);
      (h.material as THREE.SpriteMaterial).opacity = 0.6 * (1 - unity * 0.5);
    }
    if (a && ar) {
      a.position.set(ar.position.x + 0.2, 1.4, -2);
      a.scale.setScalar(8.5 + Math.sin(t * 8 + 1) * 0.3 * battle);
      (a.material as THREE.SpriteMaterial).opacity = 0.6 * (1 - unity * 0.5);
    }
    if (w) {
      w.position.set(0, 1.5, -2.5);
      w.scale.setScalar(4 + unity * 14);
      (w.material as THREE.SpriteMaterial).opacity = unity * 0.7;
    }
  });

  return (
    <>
      {tex.map((map, i) => (
        <sprite
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <spriteMaterial
            map={map}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
            fog={false}
          />
        </sprite>
      ))}
    </>
  );
}

/* ---------- Halo around the handshake ---------- */

function Halo({
  rigs,
  progress,
}: {
  rigs: React.RefObject<Rigs>;
  progress: Progress;
}) {
  const group = useRef<THREE.Group>(null);
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const v = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;

    const t = clock.elapsedTime;
    const unity = smooth(0.88, 0.99, progress.current);
    g.visible = unity > 0.01;

    const hand = rigs.current.human.handF;
    if (hand) {
      hand.getWorldPosition(v);
      g.position.copy(v);
    }
    g.scale.setScalar(Math.max(unity, 0.0001) * (1 + 0.03 * Math.sin(t * 2)));

    if (a.current) a.current.rotation.set(1.2, t * 0.6, 0);
    if (b.current) b.current.rotation.set(0.5, -t * 0.5, 1.1);
  });

  const material = {
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  };

  return (
    <group ref={group} visible={false}>
      <mesh ref={a}>
        <torusGeometry args={[1.5, 0.012, 8, 120]} />
        <meshBasicMaterial color={HUMAN} {...material} />
      </mesh>
      <mesh ref={b}>
        <torusGeometry args={[1.9, 0.012, 8, 120]} />
        <meshBasicMaterial color={AI} {...material} />
      </mesh>
    </group>
  );
}

/* ---------- Environment and camera ---------- */

function Dust({ count }: { count: number }) {
  const positions = useMemo(() => {
    const rand = mulberry32(3);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 34;
      arr[i * 3 + 1] = rand() * 12;
      arr[i * 3 + 2] = -3 - rand() * 18;
    }
    return arr;
  }, [count]);

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7dd3fc"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fog={false}
      />
    </points>
  );
}

function CameraRig({
  progress,
  exiting,
  fx,
}: {
  progress: Progress;
  exiting: React.RefObject<boolean>;
  fx: React.RefObject<Fx>;
}) {
  useFrame(({ camera, clock, size }, delta) => {
    const t = clock.elapsedTime;
    const aspect = size.width / size.height;
    const baseZ = Math.max(6.2, 6.8 / aspect);
    const p = progress.current;

    const targetZ = baseZ - 0.6 * smooth(0.6, 0.95, p) + (exiting.current ? 1.2 : 0);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.5, delta);

    const f = fx.current;
    f.shake *= Math.exp(-delta * 8);

    camera.position.x = Math.sin(t * 0.3) * 0.15 + (Math.random() - 0.5) * f.shake;
    camera.position.y = 1.5 + (Math.random() - 0.5) * f.shake * 0.7;
    camera.lookAt(0, 1.3, 0);
  });

  return null;
}

function PreloaderScene({
  small,
  progress,
  exiting,
}: Shared & { small: boolean }) {
  const rigs = useRef<Rigs>({ human: emptyRig(), ai: emptyRig() });
  const fx = useRef<Fx>({ emit: () => {}, flash: () => {}, shake: 0 });

  return (
    <Canvas
      dpr={[1, small ? 1.25 : 1.75]}
      camera={{ position: [0, 1.5, 11], fov: 50 }}
      gl={{ alpha: true, antialias: !small }}
    >
      <fog attach="fog" args={["#020b14", 14, 40]} />

      <CameraRig progress={progress} exiting={exiting} fx={fx} />
      <Backlight rigs={rigs} progress={progress} />
      <Dust count={small ? 150 : 300} />
      <gridHelper args={[60, 60, "#0e7490", "#0a3b4b"]} position={[0, -0.001, 0]} />

      <Fighter side="human" rigs={rigs} />
      <Fighter side="ai" rigs={rigs} />

      <Choreographer rigs={rigs} progress={progress} fx={fx} />
      <FxLayer fx={fx} count={small ? 80 : 130} />
      <Halo rigs={rigs} progress={progress} />
    </Canvas>
  );
}

export default memo(PreloaderScene);