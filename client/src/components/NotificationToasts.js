import { Toast, ToastContainer } from "react-bootstrap";

function MyToasts({
  props: {
    succesText,
    showSuccessToast,
    setShowSuccessToast,
    failureText,
    showFailureToast,
    setShowFailureToast,
  },
}) {
  return (
    <ToastContainer className="p-3" position={"top-end"}>
      <Toast
        onClose={() => setShowSuccessToast(false)}
        show={showSuccessToast}
        delay={5000}
        autohide
      >
        <Toast.Header closeButton={false}>
          <img
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/check-mark-button_2705.png"
            width={20}
            height={20}
            className="rounded me-2"
            alt="success"
          />
          <strong className="me-auto">Congrats</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{succesText}</Toast.Body>
      </Toast>
      <Toast
        onClose={() => setShowFailureToast(false)}
        show={showFailureToast}
        delay={5000}
        autohide
      >
        <Toast.Header closeButton={false}>
          <img
            src="https://images.emojiterra.com/google/android-11/512px/274c.png"
            width={20}
            height={20}
            className="rounded me-2"
            alt="fail"
          />
          <strong className="me-auto">Oh no</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>Something went wrong: {failureText}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default MyToasts;
