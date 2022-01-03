import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Test = () => {
  const [list, setList] = useState([]);
  const q = query(collection(db, "pages"), where("user", "==", "test@g.com"));
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data);
    };
    getData();
  }, []);

  return <div></div>;
};

export default Test;
