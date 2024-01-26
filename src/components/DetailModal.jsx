import axios from "axios";
import { useEffect, useState } from "react";
import { options2 } from "../constant";
import Loader from "./Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { useDispatch } from "react-redux";
import { setPath } from "../redux/slices/flightSlice";

const DetailModal = ({ closeModal, detailId }) => {
  const [d, setDetail] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setDetail(null);
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2
      )
      .then((res) => {
        setDetail(res.data);
        dispatch(setPath(res.data.trail));
      })
      .catch((err) => console.log(err));
  }, [detailId]);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={closeModal}>X</span>
        </p>
        {!d ? (
          <Loader />
        ) : !d.airport.destination && !d.airport.origin ? (
          <p className="warn">Bu uçuşun verileri gizlidir.</p>
        ) : (
          <>
            <h2>{d.aircraft.model?.text}</h2>
            <h2>{d.aircraft.model?.code}</h2>
            <p>
              <span>Kuyruk Kodu: </span>
              <span>{d.aircraft?.registration}</span>
            </p>

            <Splide
              options={{
                rewind: true,
                gap: "1rem",
                pagination: false,
              }}
            >
              {d.aircraft?.images?.large?.map((a, i) => (
                <SplideSlide key={i}>
                  <img className="detail-img" src={a.src} alt="Image 1" />
                </SplideSlide>
              ))}
            </Splide>

            <p>
              <span>Şirket: </span>
              <span>{d.airline.short}</span>
            </p>

            <p>
              <span>Kalkış: </span>
              <a target="_blank" href={d.airport?.origin?.website}>
                {d.airport.origin?.name}
              </a>
            </p>
            <p>
              <span>Hedef: </span>
              <a target="_blank" href={d.airport?.destination?.website}>
                {d.airport.destination?.name}
              </a>
            </p>

            <p className={`status ${d.status.icon}`}>
              <span>{d.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailModal;
