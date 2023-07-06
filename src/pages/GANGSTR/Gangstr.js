import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
export const Gangstr = () => {
    const navigate = useNavigate();

    const gangstrA = () => {
        navigate("/tools/gangstr/gangstranalysis");
    };

    const gangstrR = () => {
        navigate("/tools/gangstr/gangstrresult");
    };

    return (
        <>
            <h1>GangSTR </h1>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" onClick={gangstrA}>New Analysis</Button>
                <Button variant="light" onClick={gangstrR}>Results</Button>
            </ButtonGroup>
            <Card style={{ padding: '0px' }}>
                <Card.Body >
                    <div class="Compare">
                        <div class="Compare__1hUWQ">
                            <div class="MuiPaper-root Home_paper__1euug MuiPaper-outlined MuiPaper-rounded">
                                <p>Please see full documentation and examples at https://github.com/gymreklab/GangSTR</p>
                                <ol>
                                    <h3>Usage</h3>
                                    <p>GangSTR is a tool for genome-wide profiling tandem repeats from short reads. A key advantage of GangSTR over existing genome-wide TR tools (e.g. lobSTR or hipSTR) is that it can handle repeats that are longer than the read length. </p>
                                    <p>GangSTR takes aligned reads (BAM) and a set of repeats in the reference genome as input and outputs a VCF file containing genotypes for each locus.</p>

                                    <h3>Required Parameters:</h3>
                                    <ul>
                                        <li>bam: (file.bam,file2.bam) Comma separated list of input BAM files</li>
                                        <li>ref: Refererence genome (.fa)</li>
                                        <li>regions: Target TR loci (regions) (.bed)</li>

                                    </ul>

                                    <h3>Additional general options:</h3>
                                    <ul>
                                        <li>chrom (string): Only genotype regions on this chromosome.</li>
                                        <li>bam-samps (string): Comma separated list of sample IDs for --bam</li>
                                        <li>samp-sex (string): Comma separated list of sample sex for each sample ID (--bam-samps must be provided, see readme for more details)</li>
                                        <li>period (string): Only genotype loci with periods (motif lengths) in this comma-separated list.</li>

                                    </ul>

                                    <h3>Options for different sequencing settings</h3>
                                    <ul>
                                        <li>readlength (int): Preset read length (default: extract from alignments if not provided)</li>
                                        <li>coverage (float): Preset average coverage, should be set for exome/targeted data. Comma separated list to specify for each BAM. (default: calculate if not provided)</li>
                                        <li>insertmean (float): Fragment length mean. (default: calculate if not provided)</li>
                                        <li>insertsdev (float): Fragment length standard deviation. (default: calculate if not provided)</li>
                                        <li>min-sample-reads (int): Minimum number of reads per sample.</li>
                                    </ul>

                                    <h3>Advanced parameters for likelihood model:</h3>
                                    <ul>
                                        <li>frrweight (float): Reset weight for FRR class in likelihood model. (default 1.0)</li>
                                        <li>spanweight (float): Reset weight for Spanning class in likelihood model. (default 1.0)</li>
                                        <li>enclweight (float): Reset weight for Enclosing class in likelihood model. (default 1.0)</li>
                                        <li>flankweight (float): Reset weight for Flanking class in likelihood model. (default 1.0)</li>
                                        <li>ploidy [1,2]: Haploid (1) or diploid (2) genotyping. (default 2)</li>
                                        <li>numbstrap (int): Number of bootstrap samples for calculating confidence intervals. (default 100)</li>
                                        <li>grid-theshold (int): Use optimization rather than grid search to find MLE if search space (grid) contains more alleles than this threshold. Default: 10000</li>
                                        <li>rescue-count (int): Number of regions that GangSTR attempts to rescue mates from (excluding off-target regions). Default: 0</li>
                                        <li>max-proc-read (int): Maximum number of processed reads per sample before a region is skipped.</li>
                                    </ul>

                                    <h3>Parameters for local realignment:</h3>

                                    <ul>
                                        <li>minscore (int): Minimun alignment score for accepting reads (default 75).</li>
                                        <li>minmatch (int): Minimum matching basepairs required at the edge of the repeat region to accept flanking and enclosing reads (default 5).</li>
                                    </ul>

                                    <h3>Stutter model parameters:</h3>
                                    <ul>
                                        <li>stutterup (float): Stutter insertion probability (default 0.05).</li>
                                        <li>stutterdown (float): Stutter deletion probability (default: 0.05).</li>
                                        <li>stutterprob (float): Stutter step size parameter (default: 0.90).</li>
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
