import pytest


@pytest.mark.parametrize(
    ("query", "qt", "msg"),
    (
        ("ttll", "", "gene::TTLL5::ENSG00000119685"),
        ("ttll", "gene", "gene::TTLL5::ENSG00000119685"),
        ("kiaa099", "gene", "gene::TTLL5::ENSG00000119685"),
        ("ENSG0000015617", "gene", "gene::DRAM2::ENSG00000156171"),
        ("ENST00000557636", "gene", "gene::TTLL5::ENSG00000119685"),
        ("gallbladder", "phenotype", "hpo::Gallbladder dyskinesia::HP:0012442"),
        ("HP:0000010", "phenotype", "hpo::Recurrent urinary tract infections::HP:0000010"),
        # patient search
        ("PH000082", "patient", "individual::PH00008267::PH00008267"),
        ("82", "patient", "individual::PH00008267::PH00008267"),
        ("0082", "patient", "individual::PH00008267::PH00008267"),
        ("PH0082", "patient", None),
        ("PH000083", "patient", None),
        # variant search
        ("14-76156", "variant", "variant::14-76156575-A-G::14-76156575-A-G"),
        ("14-76156-A-G", "variant", "variant::14-76156575-A-G::14-76156575-A-G"),
        ("14-7615-A", "variant", "variant::14-76156575-A-G::14-76156575-A-G"),
        ("ENST00000286692.4:c.*242A>G", "variant", "variant::1-111660540-T-C::1-111660540-T-C"),
        ("ENSP00000286692.4:p.Arg", "variant", "variant::1-111660805-G-A::1-111660805-G-A"),
    ),
)
def test_autocomplete(_demo_client, query, qt, msg):
    resp = _demo_client.get("/autocomplete/{query}?query_type={qt}".format(query=query, qt=qt))
    assert resp.status_code == 200
    if msg:
        assert msg in resp.json
        if qt == "patient":
            assert resp.json == sorted(resp.json)
    else:
        assert len(resp.json) == 0


@pytest.mark.parametrize(
    ("limit", "msg"),
    (
        ("acme", {"message": "Please, specify a numeric limit value, acme", "success": False}),
        ("2000", {"message": "Please, specify a limit lower than 1000", "success": False}),
    ),
)
def test_autocomplete_limit(_demo_client, limit, msg):
    resp = _demo_client.get("/autocomplete/ttll?limit={limit}".format(limit=limit))
    assert resp.status_code == 400
    assert resp.json == msg

# TODO: add tests for limit

def test_autocomplete_wrong_query_type(_demo_client):
    resp = _demo_client.get("/autocomplete/ttll?query_type=acme")
    assert resp.status_code == 400
    assert resp.json == {"message": "Autocomplete request with unsupported query type 'acme'", "success": False}
