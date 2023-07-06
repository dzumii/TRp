import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
export const Qcstr = () => {
  const navigate = useNavigate();

  const qcstrA = () => {
    navigate("/tools/qcstr/qcstranalysis");
  };

  const qcstrR = () => {
    navigate("/tools/qcstr/qcstrresult");
  };

  return (
    <>
      <h1>QcSTR </h1>
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="light" onClick={qcstrA}>New Analysis</Button>
        <Button variant="light" onClick={qcstrR}>Results</Button>
      </ButtonGroup>
      <Card style={{ padding: '0px' }}>
        <Card.Body >
          <div class="Compare">
            <div class="Compare__1hUWQ">
              <div class="MuiPaper-root Home_paper__1euug MuiPaper-outlined MuiPaper-rounded">
                <p>Please see full documentation and examples at https://trtools.readthedocs.io/en/latest/source/qcSTR.html</p>
                <ol>
                  <h3>Usage</h3>
                  <p>qcSTR takes as input a VCF file and outputs several plots in pdf format. </p>


                  <h3>Required Parameters:</h3>
                  <ul>
                    <li>vcfs (VCF):Input VCF file.</li>

                  </ul>

                  <h3>Reference Bias Plot Options</h3>
                  <ul>
                    <li>refbias-binsize (int): Sets the binsize (in bp) used to bin x-axis values, which give the reference TR length. Default=5.</li>
                    <li>refbias-metric (string): Determines which metric to use to summarize the reference bias in each bin. Default=mean. Must be one of: mean or median.</li>
                    <li>refbias-mingts (int): Exclude points computed using fewer than this many genotypes. This option is meant to avoid plotting outlier points driven by bins with small numbers of TRs with that reference length. Default=100.</li>
                    <li>refbias-xrange-min (int): Exclude points corresponding to TRs with reference length less than this value.</li>
                    <li>refbias-xrange-max (int): Exclude points corresponding to TRs with reference length greater than this value.</li>
                    <li></li>
                  </ul>

                  <h3>Outputs</h3>
                  <p>qcSTR outputs the following plots:</p>
                  <ul>
                    <li>qc-sample-callnum.pdf: a barplot giving the number of calls for each sample. Can be used to determine failed or outlier samples.</li>
                    <li>qc-chrom-callnum.pdf: a barplot giving the number of calls for each chromosome. Can be useful to determine if the expected number of calls per chromosome are present.</li>
                    <li>qc-diffref-histogram.pdf: a histogram of, for each allele called, the difference between its length and the length of the reference at that locus (measured in number of repeat units). Can be used to visualize if there is a strong bias toward calling deletions vs. insertions compared to the reference, which might indicate a problem.</li>
                    <li>qc-diffref-bias.pdf: plots reference length (bp) vs. the mean (or median) difference in length of each allele called compared to the reference allele. It is expected that the mean difference should be around 0 for most settings. When this value starts to deviate from 0, e.g. for very long repeats, it could indicate a drop in call quality. The red line gives the cumulative fraction of TRs below each reference length.</li>
                    <li>qc-quality.pdf: plots the cumulative distribution of the quality scores for calls in this VCF. This will be a per-locus plot for greater than 5 samples, or a sample-stratified plot for less than or equal to 5 samples. </li>
                  </ul>

                </ol>
              </div>
            </div>
          </div>
        </Card.Body>;
      </Card>
    </>
  );
}