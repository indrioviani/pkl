import { Container, Row, Col, Button } from "react-bootstrap"
import KursusImage from"../assets/img/kursus.png"

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center">
         <Container>
        <Row className="header-box d-flex align-items-center">
          <Col lg="6">
          <h1 className="mb-4">
            Kursus Online <br /> <span>Nomor 1</span> <br />Di Bogor
          </h1>
          <p className="mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis fugiat laudantium voluptas illo nam exercitationem.</p>
          <Button variant="danger rounded-2 me-2 mb-xs-0 mb-2">Lihat Kursus</Button>
          <Button variant="outline-success rounded-2 mb-xs-0 mb-2">Lihat Promo</Button>
          </Col>
          <Col lg="6" className="pt-lg-0 pt-5">
          <img src={KursusImage} alt="kursus-img" />
          </Col>
        </Row>
      </Container>
      </header>
     
      <div className="kelas w-100 min-vh-100"></div>
    </div>
  )
}

export default HomePage