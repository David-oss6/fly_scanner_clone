import logo from "./img/logo.png";
import { useState, useEffect } from "react";
import "./style/style.css";
import { GoBtn, GoRetBtn } from "./style/styled";
import axios from "axios";

function App() {
  const [goRet, setGoRet] = useState(true);
  const [go, setGo] = useState(false);
  const [departure, setDeparture] = useState();
  const [arrival, setArrival] = useState();
  const [invertBtn, setInvertBtn] = useState(false);
  const [ads, setAds] = useState();
  const [pax, setPax] = useState({
    adultos: 1,
    ninos: 0,
    bebes: 0,
  });
  const [viajeros, setViajeros] = useState(pax.adultos + pax.ninos + pax.bebes);
  const [clase, setClase] = useState("Turista");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setViajeros(pax.adultos + pax.ninos + pax.bebes);
  }, [pax, clase]);
  useEffect(async () => {
    const x = Math.floor(Math.random() * 83);
    const y = Math.floor(Math.random() * 10);

    try {
      await axios(`https://swapi.dev/api/people/${x}`).then((res) =>
        setAds(res.data.name)
      );
    } catch (error) {
      setAds("STAR WARS");
    }
  }, []);

  const handleGoRetun = (x) => {
    if (x === 1) {
      setGo(false);
      setGoRet(true);
    }
    if (x === 2) {
      setGoRet(false);
      setGo(true);
    }
  };

  const handleInvertBtn = () => {
    setInvertBtn(!invertBtn);
    let escalon = departure;
    setDeparture(arrival);
    setArrival(escalon);
  };

  const handleBusqueda = () => {
    console.log("Lets go", `${departure} to ${arrival}`);
  };
  const handlePax = (x) => {
    if (x === "aMas") {
      setPax({
        ...pax,
        adultos: pax.adultos + 1,
      });
    }
    if (x === "aMenos" && pax.adultos > 1) {
      setPax({
        ...pax,
        adultos: pax.adultos - 1,
      });
    }
    if (x === "nMas") {
      setPax({
        ...pax,
        ninos: pax.ninos + 1,
      });
    }
    if (x === "nMenos" && pax.ninos > 0) {
      setPax({
        ...pax,
        ninos: pax.ninos - 1,
      });
    }
    if (x === "bMas") {
      setPax({
        ...pax,
        bebes: pax.bebes + 1,
      });
    }
    if (x === "bMenos" && pax.bebes > 0) {
      setPax({
        ...pax,
        bebes: pax.bebes - 1,
      });
    }
  };
  return (
    <>
      <nav className="nav">
        <img className="logo" src={logo} alt="flyScanner" />
        <ul className="links">
          <a className="colorChange" href="#">
            Vuelos
          </a>
          <a className="colorChange" href="#">
            Hoteles
          </a>
          <a className="colorChange" href="#">
            Coches
          </a>
        </ul>
      </nav>
      <div className="center">
        <div className="intemsContainer">
          <h2 className="title">Encuentra vuelos baratos</h2>
          <div className="goReturnDiv">
            <GoRetBtn
              onClick={() => handleGoRetun(1)}
              goRet={goRet}
              className="goRetBtn"
            >
              Ida y vuelta
            </GoRetBtn>
            <GoBtn onClick={() => handleGoRetun(2)} go={go}>
              Solo ida
            </GoBtn>
          </div>
          <div className="anothermore">
            <div className="inputs_btns">
              <div className="destinations">
                {invertBtn ? (
                  <>
                    <input
                      placeholder="Arrival"
                      type="text"
                      onChange={(e) => setArrival(e.target.value)}
                    />

                    <button
                      onClick={() => handleInvertBtn()}
                      className="firstBtn"
                    >
                      <i className="fa-solid fa-arrow-right-arrow-left"></i>
                    </button>
                    <input
                      placeholder="Departure"
                      type="text"
                      onChange={(e) => setDeparture(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <input
                      placeholder="Departure"
                      type="text"
                      onChange={(e) => setDeparture(e.target.value)}
                    />
                    <button
                      onClick={() => handleInvertBtn()}
                      className="firstBtn"
                    >
                      <i className="fa-solid fa-arrow-right-arrow-left"></i>
                    </button>
                    <input
                      placeholder="Arrival"
                      type="text"
                      onChange={(e) => setArrival(e.target.value)}
                    />
                  </>
                )}
              </div>
              <div className="destinatios_two">
                {goRet ? (
                  <>
                    <input type="date" />
                    <input type="date" />
                    <input
                      type="text"
                      placeholder={`${clase}, ${viajeros} viajero`}
                      onClick={() => setModal(true)}
                    />
                  </>
                ) : (
                  <>
                    <input type="date" />
                    <input
                      type="text"
                      placeholder={`${clase}, ${viajeros} viajero`}
                      onClick={() => setModal(true)}
                    />
                  </>
                )}
                {modal && (
                  <>
                    <table>
                      <thead>
                        <tr>
                          <th>Class</th>
                          <th colSpan="2">Passengers</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <button
                              className="claseBtn"
                              clase={clase}
                              onClick={() => setClase("Turista")}
                            >
                              Turista
                            </button>
                          </td>
                          <td>Adultos</td>
                          <td>
                            <button
                              className="tdBtn"
                              onClick={() => handlePax("aMenos")}
                            >
                              -
                            </button>
                            {pax.adultos}
                            <button
                              className="tdBtn"
                              onClick={() => handlePax("aMas")}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              className="claseBtn"
                              clase={clase}
                              onClick={() => setClase("Bussiness")}
                            >
                              Bussiness
                            </button>
                          </td>
                          <td>Niños</td>
                          <td>
                            <button
                              className="tdBtn"
                              onClick={() => handlePax("nMenos")}
                            >
                              -
                            </button>
                            {pax.ninos}
                            <button
                              className="tdBtn"
                              onClick={() => handlePax("nMas")}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              className="claseBtn"
                              clase={clase}
                              onClick={() => setClase("Primera")}
                            >
                              Primera
                            </button>
                          </td>
                          <td>Bebés</td>
                          <td>
                            <button
                              className="tdBtn"
                              onClick={() => handlePax("bMenos")}
                            >
                              -
                            </button>
                            {pax.bebes}
                            <button
                              className="tdBtn"
                              onClick={() => handlePax("bMas")}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <button
                              className="hechoBtn"
                              onClick={() => setModal(false)}
                            >
                              Hecho
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
            <button className="secondBtn" onClick={() => handleBusqueda()}>
              Búsqueda
            </button>
          </div>
        </div>
      </div>
      <footer>
        <div className="ads">
          {ads && (
            <>
              <p>Ads simulation</p>
              <h4>{ads}</h4>
            </>
          )}
        </div>
        <div className="textos">
          <div>
            <h3>Haz una busqueda</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
              accusamus maxime eos veniam suscipit eum soluta non distinctio,
              temporibus consequatur earum sint, molestias nam harum vero
              voluptatem aperiam sapiente facilis?
            </p>
          </div>
          <div>
            <h3>Cimprueba los resultados</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos obcaecati impedit earum alias voluptatum
              exercitationem officiis nisi maiores, ab perferendis veniam nam
              maxime accusantium, aut officia, repellat quas quaerat saepe?
            </p>
          </div>
          <div>
            <h3>!Vuela¡</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
              officia, minima animi repudiandae ut iusto quo explicabo repellat
              maiores nemo corrupti quia quas suscipit ratione, aut sequi ea,
              sed expedita.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
