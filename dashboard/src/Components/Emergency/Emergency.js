import React from "react";
import Title from "../Partials/Body-title";
import ArticleH2PHome from "../Partials/Article-h2-p-home";
import "../../assets/css/home.css";

function Emergency() {
  return (
    <>
      <Title text="Urgencias" />
      <ArticleH2PHome
        articleClassName="main-description"
        h2ClassName="fs-4"
        h2Text="En caso de emergencias"
        pClassName="fs-6"
        pText={
          <React.Fragment>
            En caso de emergencias puede llamar a <strong> *911 </strong>
            explicando la situación de emergencia que esta ocurriendo en ese
            momento.
          </React.Fragment>
        }
      />
    </>
  );
}

export default Emergency;
