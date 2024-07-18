import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Toast } from '../commons/Toast';
import { useHtmlElementIsDisplayed } from '../../hooks/useHtmlElementIsDisplayed';
import { useEmailForm } from '../../hooks/useEmailForm';
import { useEmailJS } from '../../hooks/useSendEmail';
import { Scotch } from '../commons/Scotch';
import SvgIcon from '../Mobile/SvgIcon';

export const SectionContactezMoi = () => {
  const sectionRef = useRef(null);
  const { isDisplayed } = useHtmlElementIsDisplayed(sectionRef, 100, true);
  const exposedClass = isDisplayed ? 'exposed' : 'notExposed';

  let canSendMail = false;

  function onChange(value) {
    console.log('Captcha value:', value);
    canSendMail = value;
  }

  const { formData, handleChange, reset } = useEmailForm();

  const { send, status } = useEmailJS();

  // useEffect(() => {
  // 	if (status === "success") {
  // 		alert("Votre email à bien été envoyé !");
  // 		reset();
  // 	} else if (status === "failure") {
  // 		alert("Failed to send email.");
  // 	}
  // }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSendMail === false) {
      console.log('Veuillez valider votre Captcha');
      return false;
    }

    send(formData);
  };

  return (
    <section id="CON" className={`contactez-moi bg-dotted`} ref={sectionRef}>
      <Toast />
      <form onSubmit={handleSubmit}>
        {status === 'success' && <p>Envoi OK x</p>}
        {status === 'failure' && <p>Envoi KO x</p>}
        <h2>CONTACTEZ-MOI</h2>
        <Scotch on="mobile" text={'Vos informations'} angle={-2} size={''} />
        <div className="input-container">
          <input
            type="text"
            name="userName"
            placeholder="Votre nom"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="userEmail"
            placeholder="Votre email"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="userPhone"
            placeholder="Votre numéro (optionnel)"
            value={formData.userPhone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="messageSubject"
            placeholder="Votre sujet"
            value={formData.messageSubject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="scotch-contactez-moi-3">
          <Scotch
            on="mobile"
            text={'Votre message'}
            angle={1}
            size={'long'}
            style={{ marginLeft: '2rem' }}
          />
        </div>
        <textarea
          name="messageContent"
          value={formData.messageContent}
          onChange={handleChange}
          required
        ></textarea>
        <div className="send-mail">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onChange}
          />
          <button type="submit" className="pm-1">
            Envoyer le mail
            <SvgIcon fillColor="#e9e8de" />
          </button>
        </div>
        {status === 'sending' && <p>envoi en cours...</p>}
      </form>
    </section>
  );
};
