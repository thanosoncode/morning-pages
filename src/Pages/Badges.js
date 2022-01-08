import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../Components/Navbar";
import {
  Container,
  Grid,
  Bubble,
  StyledImg,
} from "../Components/styles/Badges.styled.js";
import { useGlobalContext } from "../context";
import { badgesData } from "../data/badges";

const Badges = () => {
  const { badges } = useGlobalContext();

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [bubbleX, setBubbleX] = useState(0);
  const [bubbleY, setBubbleY] = useState(0);
  const [bubbleText, setBubbleText] = useState("");
  const [bubbleWidth, setBubbleWidth] = useState(null);

  const handleMouseOver = (e) => {
    setIsMouseOver(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const itemCenter = rect.x + rect.width / 2;
    const itemHeight = rect.y - 60;
    const title = e.currentTarget.nextElementSibling.textContent;
    const obj = badgesData.find((item) => item.name === title);

    setBubbleText(badges?.[obj.id] ? obj.complete : obj.task);
    setBubbleX(itemCenter);
    setBubbleY(itemHeight);
  };

  const bubbleRef = useRef();

  useEffect(() => {
    setBubbleWidth(bubbleRef.current.getBoundingClientRect().width);
  }, [bubbleX]);

  const checkBadgeTrue = useCallback(
    (id) => {
      return badges?.[id];
    },
    [badges]
  );

  useEffect(() => {
    if (badges) {
      checkBadgeTrue();
    }
  }, [badges, checkBadgeTrue]);

  return (
    <>
      <Navbar />
      <Container>
        <h1>Badges</h1>
        <Grid>
          {badgesData.map((item, index) => {
            const { name, img, id } = item;
            return (
              <article key={index}>
                <section
                  onMouseOver={(e) => handleMouseOver(e)}
                  onMouseLeave={() => setIsMouseOver(false)}
                >
                  <StyledImg
                    src={img}
                    alt=""
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    filter={() =>
                      checkBadgeTrue(id)
                        ? "none"
                        : "contrast(0) sepia(100%) hue-rotate(190deg) saturate(60%) brightness(90%) opacity(40%)"
                    }
                  />
                </section>
                <h5>{name}</h5>
                <Bubble
                  top={bubbleY}
                  left={bubbleX - bubbleWidth / 2}
                  display={isMouseOver ? "block" : "none"}
                  ref={bubbleRef}
                >
                  <p>{bubbleText}</p>
                  <div></div>
                </Bubble>
              </article>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Badges;
