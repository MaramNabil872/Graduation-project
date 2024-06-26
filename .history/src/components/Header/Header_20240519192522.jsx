import React from 'react';
import { IonCol, IonHeader, IonRow } from "@ionic/react";
import { useHistory } from "react-router";
import "./Header.css";

const Header = ({ toolbarTitle, showBackBtn, t }) => {
  const history = useHistory();
  return (
    <IonHeader class="ion-no-border">
      {/* <img id="headerImg" className="w-full" src="./assets/images/header.png" /> */}
      <div className="mx-7">
        {showBackBtn && (
          <IonRow className="my-7">
            <IonCol>
              {/* <img
                onClick={() => {
                  history.goBack();
                }}
                id="back"
                src="./assets/images/back.png"
              ></img> */}
            </IonCol>
          </IonRow>
        )}
        {toolbarTitle !== "" && (
          <>
            <IonRow className="mb-7">
              <IonCol>
                <p className="text-2xl font-semibold text-main-theme">
                  {toolbarTitle}
                </p>
              </IonCol>
            </IonRow>
          </>
        )}
      </div>
    </IonHeader>
  );
};

export default Header;
