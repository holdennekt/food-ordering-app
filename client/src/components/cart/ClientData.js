import { Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";

function ClientData({
  props: {
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    adress,
    setAdress,
    err,
  },
}) {
  return (
    <div className="p-3 border border-dark rounded-2">
      <Form.Group>
        <Form.Label className="m-0" htmlFor="name">
          Name:
        </Form.Label>
        <Form.Control
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {err.name && <Form.Text className="text-danger">{err.name}</Form.Text>}
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label className="m-0" htmlFor="email">
          Email:
        </Form.Label>
        <Form.Control
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {err.email && (
          <Form.Text className="text-danger">{err.email}</Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mt-2">
        <PhoneInput
          className="mt-2"
          country={"ua"}
          specialLabel={"Phone number:"}
          disableDropdown={true}
          placeholder={"+380 (93) 123 45 67"}
          value={phoneNumber}
          onChange={(phone) => setPhoneNumber(phone)}
        />
        {err.phoneNumber && (
          <Form.Text className="text-danger">{err.phoneNumber}</Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label className="m-0" htmlFor="adress">
          Adress:
        </Form.Label>
        <Form.Control
          id="adress"
          onChange={(e) => setAdress(e.target.value)}
          value={adress}
        />
        {err.adress && (
          <Form.Text className="text-danger">{err.adress}</Form.Text>
        )}
      </Form.Group>
    </div>
  );
}

export default ClientData;
