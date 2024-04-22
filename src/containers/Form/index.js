import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";
import "./form.scss";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    type: "",
    email: "",
    message: "",
  });

  /**
   * Vérifier si tous les champs requis sont remplis
   */
  const validateForm = () =>
    formData.name !== "" &&
    formData.firstName !== "" &&
    formData.type !== "" &&
    formData.email !== "" &&
    formData.message !== "";

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      // Vérifier la validation du formulaire
      if (!validateForm()) {
        // Si le formulaire n'est pas valide, on ne continue pas mais on affiche un message d'alerte
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
      }

      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        setShowConfirmation(true);
        onSuccess();
        // Réinitialiser les champs du formulaire après un certain délai
        setTimeout(() => {
          setShowConfirmation(false);
          setFormData({
            name: "",
            firstName: "",
            type: "",
            email: "",
            message: "",
          });
          // Appeler onSuccess si besoin
        }, 3000); // 3000ms = 3 secondes
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, formData]
  );

  return (
    <form onSubmit={sendContact}>
      {showConfirmation ? (
        <div className="row">
          <div className="col">
            <p>Votre message a été envoyé avec succès !</p>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <Field
              placeholder=""
              label="Nom"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Field
              placeholder=""
              label="Prénom"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <Select
              selection={["Personnel", "Entreprise"]}
              label="Personnel / Entreprise"
              value={formData.type}
              onChange={(newValue) =>
                setFormData({ ...formData, type: newValue })
              }
              type="large"
              titleEmpty
            />
            <Field
              placeholder=""
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
              {sending ? "En cours" : "Envoyer"}
            </Button>
          </div>
          <div className="col">
            <Field
              placeholder="message"
              label="Message"
              type={FIELD_TYPES.TEXTAREA}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>
        </div>
      )}
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
