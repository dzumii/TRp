
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
export const Mergestr = () => {
  const navigate = useNavigate();

  const mergestrA = () => {
    navigate("/tools/mergestr/mergestranalysis");
  };

  const mergestrR = () => {
    navigate("/tools/mergestr/mergestrresult");
  };

  return (
    <>
      <h1>MergeSTR </h1>
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="light" onClick={mergestrA} className='card-button'>New Analysis</Button>
        <Button variant="light" onClick={mergestrR} className='card-button'>Results</Button>
      </ButtonGroup>
      <Card style={{ padding: '0px' }}>
        <Card.Body >
          <div class="Compare">
            <div class="Compare__1hUWQ">
              <div class="MuiPaper-root Home_paper__1euug MuiPaper-outlined MuiPaper-rounded">


                <p>Please see full documentation and examples
                  <a href="https://trtools.readthedocs.io/en/latest/source/mergeSTR.html" > here</a>
                </p>
                <p>
                  Users are also advised to run this tool offline in cases where the dataset is heavy. Instructions on how to install and run this tool offline is available
                  <a href="https://github.com/gymreklab/TRTools" > here</a>
                </p>

                <ol>
                  <h3 className='card-title'>Usage</h3>
                  <p>MergeSTR takes as input two or more VCF files with TR genotypes and outputs a combined VCF file. </p>


                  <h3 className='card-title'>Required Parameters:</h3>
                  <ul>
                    <li>vcfs (VCF):  List of VCF files to merge. All must have been created by the same TR genotyper.</li>
                    <li>vcftype (string): Type of VCF files being merged. Default = auto. Must be one of: gangstr, advntr, hipstr, eh, popstr.</li>
                  </ul>

                  <h3 className='card-title'>Special Merge Options:</h3>
                  <ul>
                    <li>update-sample-from-file: Append file names to sample names. Useful if sample names are repeated across VCF files.</li>
                  </ul>

                  <h3 className='card-title'>Outputs</h3>
                  <p>MergeSTR outputs a merged VCF file merge.vcf with the merged genotypes</p>

                </ol>
              </div>
            </div>
          </div>
        </Card.Body>;
      </Card>

    </>
  );
}