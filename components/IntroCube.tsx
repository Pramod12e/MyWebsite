const faces = [
  { title: "CSE", detail: "Curiosity" },
  { title: "FULL STACK", detail: "Ideas to products" },
  { title: "AI / ML", detail: "Exploring what's next" },
  { title: "OPEN SOURCE", detail: "Building together" },
  { title: "PROBLEM SOLVING", detail: "One step at a time" },
  { title: "CREATING", detail: "With purpose" },
];

const outerTransforms = [
  "translateZ(46px)",
  "rotateY(180deg) translateZ(46px)",
  "rotateY(90deg) translateZ(46px)",
  "rotateY(-90deg) translateZ(46px)",
  "rotateX(90deg) translateZ(46px)",
  "rotateX(-90deg) translateZ(46px)",
];

const innerTransforms = [
  "translateZ(23px)",
  "rotateY(180deg) translateZ(23px)",
  "rotateY(90deg) translateZ(23px)",
  "rotateY(-90deg) translateZ(23px)",
  "rotateX(90deg) translateZ(23px)",
  "rotateX(-90deg) translateZ(23px)",
];

export default function IntroCube() {
  return (
    <div className="about-hypercube" role="img" aria-label="Animated cube showing computer science, full-stack development, AI and machine learning, open source, problem solving, and creativity">
      <span aria-hidden="true" className="about-hypercube__orbit about-hypercube__orbit--one" />
      <span aria-hidden="true" className="about-hypercube__orbit about-hypercube__orbit--two" />
      <div aria-hidden="true" className="about-hypercube__outer">
        {faces.map((face, index) => (
          <span key={face.title} className="about-hypercube__face" style={{ transform: outerTransforms[index] }}>
            <span>{face.title}</span>
            <small>{face.detail}</small>
          </span>
        ))}
      </div>
      <div aria-hidden="true" className="about-hypercube__inner">
        {innerTransforms.map((transform) => <span key={transform} className="about-hypercube__inner-face" style={{ transform }} />)}
      </div>
      <span aria-hidden="true" className="about-hypercube__satellite about-hypercube__satellite--cyan" />
      <span aria-hidden="true" className="about-hypercube__satellite about-hypercube__satellite--pink" />
    </div>
  );
}
