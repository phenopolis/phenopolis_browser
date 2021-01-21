import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, Container } from '@material-ui/core';
import Loading from '../components/General/Loading';
import { useTranslation } from 'react-i18next';
import { getGene } from '../redux/actions/gene';

const MetaData = React.lazy(() => import('../components/MetaData'));
const VirtualGrid = React.lazy(() => import('../components/Table/VirtualGrid'));
const VersatileTable = React.lazy(() => import('../components/BaseTable/VersatileTable'));

const Gene = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  const { geneInfo, loaded } = useSelector((state) => ({
    geneInfo: state.Gene.data[0],
    loaded: state.Gene.loaded,
  }));

  useEffect(() => {
    dispatch(getGene(props.match.params.geneId));
  }, [location]);

  useEffect(() => {
    dispatch(getGene(props.match.params.geneId));
  }, []);

  return (
    <>
      {loaded ? (
        <React.Fragment>
          <CssBaseline />
          <div className="myPatients-container">
            <MetaData
              metadata={geneInfo.metadata}
              name={
                geneInfo.metadata.data[0].gene_name +
                ' - ' +
                geneInfo.metadata.data[0].full_gene_name
              }
            />
            <Container maxWidth="xl">
              <VersatileTable tableData={geneInfo.variants} />
              {/* <VirtualGrid
                tableData={geneInfo.variants}
                title={t('Gene.Variants_Analysis')}
                subtitle={t('Gene.Variants Analysis_subtitle')}
                configureLink="gene/variants"
                name={
                  geneInfo.metadata.data[0].gene_name +
                  ':' +
                  geneInfo.metadata.data[0].chrom +
                  ':chr' +
                  geneInfo.metadata.data[0].chrom +
                  ':' +
                  geneInfo.metadata.data[0].start +
                  '-' +
                  geneInfo.metadata.data[0].stop
                }
                genomePlot={true}
              /> */}
            </Container>
          </div>
        </React.Fragment>
      ) : (
        <Loading message={t('Gene.message')} />
      )}
    </>
  );
};

export default Gene;
