const POTENCIA = 'M30 180 C 90 172, 150 120, 210 78 S 300 26, 330 30 S 362 52, 372 70'
const TORQUE = 'M30 150 C 70 110, 120 70, 170 62 S 270 74, 320 110 S 360 150, 372 160'
const RPM = [2000, 3000, 4000, 5000, 6000, 7000]

function CurvaDyno() {
  return (
    <figure className="curva-dyno">
      <svg viewBox="0 0 400 220" role="img" aria-label="Curvas de potencia y torque de un ensayo">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} className="curva-grilla" x1="30" x2="372" y1={y} y2={y} />
        ))}
        {RPM.map((rpm, i) => (
          <text key={rpm} className="curva-eje" x={30 + i * 68.4} y="212" textAnchor="middle">
            {rpm}
          </text>
        ))}
        <path className="curva curva-torque" d={TORQUE} pathLength="1" />
        <path className="curva curva-potencia" d={POTENCIA} pathLength="1" />
      </svg>
      <figcaption>
        <span className="lectura">
          Potencia máxima
          <strong>412 HP a 6.400 rpm</strong>
        </span>
        <span className="lectura lectura-torque">
          Torque máximo
          <strong>52 kgm a 4.100 rpm</strong>
        </span>
      </figcaption>
    </figure>
  )
}

export default CurvaDyno
