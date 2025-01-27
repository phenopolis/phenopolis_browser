-- Script to be run from "ec2-user@ip-10-0-1-173 (ssh phenopolis_api)", accessed only via "neuromancer".
-- this script need to be copied in the server referred above.
-- run: psql -f dump_for_demo.sql "service=dev_root"

\! mkdir -p for_demo

create temp view t_iv as
    select iv.* from phenopolis.individual_variant iv
    join phenopolis.individual_gene ig on ig.individual_id = iv.individual_id
    where ig.gene_id = any('{3,15644,19297,21302}')
    union
    select iv.* from phenopolis.individual_variant iv
    join phenopolis.variant_gene vg on vg.variant_id = iv.variant_id
    where vg.gene_id = any('{ENSG00000184502,ENSG00000156171,ENSG00000119685}')
;

-- get variants
\copy (select distinct v.* from phenopolis.variant v join t_iv on t_iv.variant_id = v.id order by v.chrom, v.pos, v."ref", v.alt) to 'for_demo/phenopolis.variant.csv' csv header;
-- COPY 7523

-- get individual_variant
\copy (select * from t_iv  order by individual_id, chrom, pos, "ref", alt) to 'for_demo/phenopolis.individual_variant.csv' csv header;
-- COPY 8124

-- get individual_gene
-- WARN: empty in phenopolis_dev_db
-- built manually elsewhere

-- get individual
\copy (select * from phenopolis.individual where id in (select individual_id from t_iv) order by id) to 'for_demo/phenopolis.individual.csv' csv header;
-- COPY 70

-- get genes
\copy (select * from ensembl.gene where hgnc_symbol = any('{TTLL5,DRAM2,GAST,VPS13B}') order by ensembl_gene_id) to 'for_demo/ensembl.gene.csv' csv header;
-- COPY 9

-- get gene_synonym
\copy (select * from ensembl.gene_synonym where gene = any('{29110,21302,41378,11191,19297,24177,15644,31437,3,43138,32811}') order by gene, external_synonym) to 'for_demo/ensembl.gene_synonym.csv' csv header;
-- COPY 26

-- get variant_gene
\copy (select * from phenopolis.variant_gene where gene_id = any('{ENSG00000184502,ENSG00000156171,ENSG00000119685}') or variant_id in (select variant_id from t_iv) order by gene_id, variant_id) to 'for_demo/phenopolis.variant_gene.csv' csv header;
-- COPY 305

-- get ensembl.transcript
\copy (select * from ensembl.transcript where ensembl_gene_id = any('{ENSG00000184502,ENSG00000156171,ENSG00000119685}') order by identifier) to 'for_demo/ensembl.transcript.csv' csv header;
-- COPY 18

-- get ensembl.transcript_uniprot
\copy (select * from ensembl.transcript_uniprot where transcript in (select identifier from ensembl.transcript where ensembl_gene_id = any('{ENSG00000184502,ENSG00000156171,ENSG00000119685}')) order by transcript) to 'for_demo/ensembl.transcript_uniprot.csv' csv header;
-- COPY 12

drop view t_iv;
