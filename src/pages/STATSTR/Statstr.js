import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
export const Statstr = () => {
  const navigate = useNavigate();

  const statstrA = () => {
    navigate("/tools/statstr/statstranalysis");
  };

  const statstrR = () => {
    navigate("/tools/statstr/statstrresult");
  };

  return (
    <>
      <h1>StatSTR </h1>
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="light" onClick={statstrA}>New Analysis</Button>
        <Button variant="light" onClick={statstrR}>Results</Button>
      </ButtonGroup>
      <Card style={{ padding: '0px' }}>
        <Card.Body >
          <div class="Compare">
            <div class="Compare__1hUWQ">
              <div class="MuiPaper-root Home_paper__1euug MuiPaper-outlined MuiPaper-rounded">
                <p>Please see full documentation and examples at https://trtools.readthedocs.io/en/latest/source/statSTR.html</p>
                <ol>
                  <h3>Usage</h3>
                  <p>StatSTR takes in a TR genotyping VCF file and outputs per-locus statistics. </p>


                  <h3>Required Parameters:</h3>
                  <ul>
                    <li>vcfs (VCF):The input TR VCF file.</li>

                  </ul>

                  <h3>Optional general parameters:</h3>
                  <ul>
                    <li>vcftype (string): The type of VCF file being processed. Default = auto Must be one of: gangstr, advntr, hipstr, eh, popstr.</li>
                    <li>samples (string): A file containing a list of samples to include in computing statistics. If not given, all samples are used. To compute statistics for multiple groups of samples, you can give a comma-separated list of samples files. Sample files should list one sample per line, no header line. Samples not found in the VCF are silently ignored.</li>
                    <li>sample-prefixes (string): The prefixes to name output for each samples group. By default uses 1, 2, 3 etc. Must be sample length as --samples.</li>
                    <li>region (string): Restrict to specific regions (chrom:start-end). Requires the input VCF to be bgzipped and tabix indexed.</li>
                    <li>precision (int): How much precision to use when writing stats (default = 3)</li>

                  </ul>

                  <h3>Outputs</h3>
                  <p>StatSTR outputs a tab-delimited file with columns chrom, start and end plus an additional column for each statistic specified. If multiple sample groups are specified, instead there is one additional column for each group-by-statistic pair.</p>


                </ol>
              </div>
            </div>
          </div>
        </Card.Body>;
      </Card>
    </>
  );
}