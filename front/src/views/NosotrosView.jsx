import banner from '../assets/banner-motorroll.jpg'
import banco from '../assets/banco-rodillos.jpg'
import moto from '../assets/moto-en-banco.jpg'

function NosotrosView() {
  return (
    <section className="nosotros">
      <img src={banner} alt="Motorroll" className="portada-banner" />
      <h1 className="titulo-pagina">Sobre Motorroll</h1>
      <p>
        Motorroll es un marketplace de bancos de prueba de potencia y equipamiento para talleres. Los
        fabricantes y distribuidores publican sus productos y los talleres los compran en un solo lugar.
      </p>
      <div className="nosotros-fotos">
        <img src={banco} alt="Banco de rodillos para autos" />
        <img src={moto} alt="Moto en un banco de rodillos" />
      </div>
      <h2>Contacto</h2>
      <ul className="nosotros-contacto">
        <li>
          Web: <a href="https://www.motorroll.com">www.motorroll.com</a>
        </li>
        <li>
          Mail: <a href="mailto:info@motorroll.com">info@motorroll.com</a>
        </li>
        <li>
          Teléfono: <a href="tel:+5491165520097">11 6552-0097</a>
        </li>
        <li>
          YouTube: <a href="https://www.youtube.com/@CHELOZEN2">@CHELOZEN2</a>
        </li>
      </ul>
    </section>
  )
}

export default NosotrosView
