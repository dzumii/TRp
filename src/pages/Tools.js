import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export const Tools = () => {
  const navigate = useNavigate();

  const gangstr = () => {
    navigate("/tools/gangstr");
  };
  const hipstr = () => {
    navigate("/tools/hipstr");
  };
  const eh = () => {
    navigate("/tools/eh");
  };
  const dumpstr = () => {
    navigate("/tools/dumpstr");
  };
  const mergestr = () => {
    navigate("/tools/mergestr");
  };
  const comparestr = () => {
    navigate("/tools/comparestr");
  };
  const qcstr = () => {
    navigate("/tools/qcstr");
  };
  const statstr = () => {
    navigate("/tools/statstr");
  };
  return (
    <>

      {/* <h1>Available Tools </h1> */}
      <div className="d-grid gap-2 p-4" style={{ height: "100vh" }}>
        <Button variant="light" size="lg" onClick={gangstr}> GangSTR </Button>
        <Button variant="light" size="lg" onClick={hipstr}> HipSTR </Button>
        <Button variant="light" size="lg" onClick={eh}> ExpansionHunter </Button>
        <Button variant="light" size="lg" onClick={dumpstr}> dumpSTR </Button>
        <Button variant="light" size="lg" onClick={mergestr}> mergeSTR </Button>
        <Button variant="light" size="lg" onClick={comparestr}> compareSTR </Button>
        <Button variant="light" size="lg" onClick={qcstr}> qcSTR </Button>
        <Button variant="light" size="lg" onClick={statstr}> statSTR </Button>
      </div>

    </>

  )
};

