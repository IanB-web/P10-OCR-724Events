import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";


import "./style.scss";



const Slider = () => {

  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      // () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      // 5000
      // DEBUG DEFILEMENT INFINI
      // > Incrémentation de l'index de 1
      // >> si index = byDataDesc.lenght alors on reset grace au modulo
      // >>> reste à faire division = index du prochain slide
     () => setIndex((index + 1) % (byDateDesc?.length || 0)), 5000
    );
  };
  useEffect(() => {
    nextCard();
  });


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // remplacement key + ajout div
        <div key={uuidv4()}>
          <div
          // remplacement key
            key={uuidv4()}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                // remplacement key
                  key={uuidv4()}
                  type="radio"
                  name="radio-button"
                  // checked={idx === radioIdx}
                  // Remplacement par index, car ici idx est l'index de la boucle
                  checked={index === radioIdx}
                  onChange={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
