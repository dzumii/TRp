import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
export const Comparestr = () => {
  const navigate = useNavigate();

  const comparestrA = () => {
    navigate("/tools/comparestr/comparestranalysis");
  };

  const comparestrR = () => {
    navigate("/tools/comparestr/comparestrresult");
  };

  return (
    <>
      <h1>CompareSTR </h1>
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="light" onClick={comparestrA} className='card-button'>New Analysis</Button>
        <Button variant="light" onClick={comparestrR} className='card-button'>Results</Button>
      </ButtonGroup>
      <Card style={{ padding: '0px' }}>
        <Card.Body >
          <div class="Compare">
            <div class="Compare__1hUWQ">
              <div class="MuiPaper-root Home_paper__1euug MuiPaper-outlined MuiPaper-rounded">
                <p>Please see full documentation and examples
                  <a href="https://trtools.readthedocs.io/en/latest/source/compareSTR.html " > here</a>
                </p>
                <p>
                  Users are also advised to run this tool offline in cases where the dataset is heavy. Instructions on how to install and run this tool offline is available
                  <a href="https://github.com/gymreklab/TRTools" > here</a>
                </p>


                <ol>
                  <h3 className='card-title'>Usage</h3>
                  <p>CompareSTR takes as input two VCF files with overlapping TRs and samples and outputs metrics and plots based on comparing calls across the two VCFs. The input VCF files must be sorted, indexed, and have the appropriate ##contig header lines. CompareSTR only considers the subset of samples shared across two VCF files being compared, based on sample ID in the VCF headers. </p>
                  <p>Note: if comparing two VCFs with phased calls, ensure the chromosome ordering matches. A ‘motherAllele|fatherAllele’ representation will not match with a ‘fatherAllele|motherAllele’ representation.</p>

                  <h3 className='card-title'>Required Parameters:</h3>
                  <ul>
                    <li>vcf1 (VCF): First VCF file to compare.</li>
                    <li>vcf2 (VCF): Second VCF file to compare.</li>
                  </ul>

                  <h3 className='card-title'>Filtering Options:</h3>
                  <ul>
                    <li>samples (string): File containing list of samples to include. If not specified, all samples are used.</li>
                    <li>region (string): Restrict to this region chrom:start-end.</li>
                  </ul>

                  <h3 className='card-title'>Metrics to stratify results:</h3>
                  <ul>
                    <li>stratify-fields: Comma-separated list of FORMAT fields to stratify by. e.g. DP,Q.</li>
                    <li>stratify-binsizes: Comma-separated list of min:max:binsize to stratify each field on. Must be same length as --stratify-fields. e.g. 0:50:5,0:1:0.1 . The range [min, max] is inclusive.</li>
                    <li>stratify-file: Specify which file to look at the --stratify-fields in. If set to 0, apply to both files. If set to 1, apply only to --vcf1. If set to 2, apply only to --vcf2.</li>
                  </ul>

                  <h3 className='card-title'>Plotting options:</h3>
                  <ul>
                    <li>bubble-min: Minimum x/y axis value to display on bubble plots.</li>
                    <li>bubble-max: Maximum x/y axis value to display on bubble plots.</li>
                  </ul>

                  <h3 className='card-title'>Other options:</h3>

                  <ul>
                    <li>vcftype1 (string): Type of VCF file 1.</li>
                    <li>vcftype2 (string): Type of VCF file 2.</li>
                  </ul>

                  <h3 className='card-title'>OUTPUTS</h3>
                  <p>In output files, compareSTR reports the following metrics:</p>
                  <ul>
                    <li>Length concordance: % of genotypes concordant between the two VCF files when only considering TR allele lengths.</li>
                    <li>Sequence concordance: % of genotypes concordant between the two VCF files when considering TR allele sequence. Currently only relevant for HipSTR. Otherwise will be identical to length concordance.</li>
                    <li>R2: Pearson r2 between the sum of allele lengths at each call compared between the two VCF files, where allele lengths are measured as number of repeat copies different from the reference.</li>
                  </ul>
                  <p>These metrics and numcalls only reflect the (sample, locus) pairs that were called by both callers</p>
                  <p>compareSTR outputs the following text files and plots:</p>
                  <ul>
                    <li>compare-overall.tab: Has columns period, concordance-seq, concordance-len, r2, numcalls. Plus additional columns for any FORMAT fields to stratify results on. This file has one line for all results (period=”ALL”) and a different line for each period analyzed separately if request by --period. If stratifying by format fields, it will have additional lines for each range of values for each of those fields.</li>
                    <li>compare-locuscompare.tab: Has columns chrom, start, metric-conc-seq, metric-conc-len, numcalls. There is one line for each TR.</li>
                    <li>compare-locuscompare.pdf: Plots the length concordance metric for each TR locus considered.</li>
                    <li>compare-samplecompare.tab: Has columns sample, metric-conc-seq, metric-conc-len, numcalls. One line per sample.</li>
                    <li>compare-samplecompare.tab: Has columns sample, metric-conc-seq, metric-conc-len, numcalls. One line per sample</li>
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