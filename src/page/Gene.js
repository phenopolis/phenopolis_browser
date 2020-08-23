import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CssBaseline, Container } from '@material-ui/core';
import Loading from '../components/General/Loading';
import { setSnack } from '../redux/actions/snacks';
import { useTranslation } from 'react-i18next';
import { getGene } from '../redux/actions/gene';

const MetaData = React.lazy(() => import('../components/MetaData'));
const VirtualGrid = React.lazy(() => import('../components/Table/VirtualGrid'));

const Gene = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [valid, setValid] = useState(false);
  const { error, geneInfo } = useSelector((state) => ({
    geneInfo: state.Gene.data[0],
    error: state.Gene.error,
  }));

  useEffect(() => {
    setValid(false);
    dispatch(getGene(props.match.params.geneId));
  }, [location]);

  useEffect(() => {
    dispatch(getGene(props.match.params.geneId));
  }, []);

  useEffect(() => {
    if (error === 404) {
      history.push('/');
      dispatch(setSnack('Gene not exist.', 'warning'));
    } else if (error === 401) {
      history.push(`/login?link=${window.location.pathname}`);
    }

    if (geneInfo !== undefined) {
      setValid(true);
    }
  }, [error, geneInfo]);

  return (
    <>
      {valid ? (
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
              <VirtualGrid
                tableData={geneInfo.variants}
                title={t('Gene.Variants_Analysis')}
                subtitle={t('Gene.Variants Analysis_subtitle')}
                configureLink="gene/variants"
              />
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
