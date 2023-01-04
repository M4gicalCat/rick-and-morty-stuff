import { useLayoutEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { endPoint } from "../Model";
import { addPersonnages } from "../store/PersoSlice";


export function useWindowSize() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return width;
}

export function usePersonnages() {
  const personnages = useSelector(s => s.personnages);
  const dispatch = useDispatch();

  return {
    getPersonnages: async (ids) => {
      const toFetch = [];

      let persos = [];
      for (const id of ids) {
        if (!personnages.find(p => +p.id === +id)) toFetch.push(id);
      }
      if (toFetch.length > 0) {
        persos = await (await fetch(`${endPoint}/character/[${toFetch.join(",")}]`)).json();
        dispatch(addPersonnages(persos));
      }
      return ids.map(id => [...personnages, ...persos].find(p => +p.id === +id));
    }
  }
}

export function useMousePosition() {
  const [position, setPosition] = useState({x: null, y: null});

  const updateMousePosition = (ev) => {
    setPosition({x: ev.clientX, y: ev.clientY});
  };

  useLayoutEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return position;
}