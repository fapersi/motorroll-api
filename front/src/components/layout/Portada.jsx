import banner from '../../assets/banner-motorroll.jpg'
import banco from '../../assets/banco-rodillos.jpg'

function Portada() {
  return (
    <section className="portada">
      <img src={banner} alt="Motorroll" className="portada-banner" />
      <div>
        <h1>Bancos de prueba y equipamiento para talleres</h1>
        <p>Comprá directo a fabricantes y distribuidores, o publicá tus productos.</p>
      </div>
      <img src={banco} alt="Banco de rodillos" />
    </section>
  )
}

export default Portada
