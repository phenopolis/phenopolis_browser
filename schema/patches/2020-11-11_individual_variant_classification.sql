begin;

set local search_path to phenopolis, public;

create table individual_variant_classification (
    id bigserial primary key,
    individual_id int not null,
    variant_id bigint not null,
    FOREIGN KEY (variant_id, individual_id) REFERENCES individual_variant(variant_id, individual_id),
    user_id text not null,
    classified_on timestamp with time zone,
    -- this represents the ACMG classification
    classification text not null check (classification in ('pathogenic', 'likely_pathogenic', 'benign', 'likely_benign', 'unknown_significance')),
    pubmed_id text,
    notes text
);

create index on individual_variant_classification(user_id);
create index on individual_variant_classification(individual_id, variant_id);
create index on individual_variant_classification(variant_id);
create index on individual_variant_classification(pubmed_id);

commit;
