from views import *
from lookups import *
import requests
import re
from utils import *
import itertools
import csv
import subprocess


@app.route('/search', methods=['GET','POST'])
@requires_auth
def search():
    cache_key = 't-homepage'
    #t = cache.get(cache_key)
    #if t: return t
    db=get_db()
    patients_db=get_db(app.config['DB_NAME_PATIENTS']) 
    total_variants=db.variants.count()
    print('total_variants',total_variants,)
    total_patients=patients_db.patients.count()
    print('total_patients',total_patients,)
    male_patients=patients_db.patients.find( {'sex':'M'}).count()
    print('male_patients',male_patients,)
    female_patients=patients_db.patients.find( {'sex':'F'}).count()
    print('female_patients',female_patients,)
    unknown_patients=patients_db.patients.find( {'sex':'U'}).count()
    if config.LOCAL:
        hpo_json={}
    else:
        hpo_file='uclex_stats/overall_hpo_2016_Aug_2.json'
        hpo_json = json.load(open(hpo_file,'r'))
    exac_variants=0
    print('exac_variants',exac_variants,)
    pass_variants=db.variants.find({'FILTER':'PASS'}).count()
    print('pass_variants',pass_variants,)
    #pass_exac_variants=db.variants.find({'in_exac':True,'filter':'PASS'}).count()
    #pass_exac_variants=db.variants.find({'in_exac':True,'filter':'PASS'}).count()
    pass_exac_variants=0
    print('pass_exac_variants',pass_exac_variants,)
    #pass_exac_variants=db.variants.find({'in_exac':True,'filter':'PASS'}).count()
    pass_exac_variants=0
    #nonexac_variants=db.variants.find({'in_exac':False}).count()
    nonexac_variants=0
    #pass_nonexac_variants=db.variants.find({'in_exac':False,'filter':'PASS'}).count()
    pass_nonexac_variants=0
    nonpass_variants=(total_variants-pass_variants)
    nonpass_nonexac_variants=nonexac_variants-pass_nonexac_variants
    try:
        version_number = subprocess.check_output(['git', 'describe', '--exact-match'])
    except:
        version_number = None
    print('Version number is:-')
    print(version_number)
    return jsonify( title='home',
        total_patients=total_patients,
        male_patients=male_patients,
        female_patients=female_patients,
        unknown_patients=unknown_patients,
        hpo_json=json.dumps(hpo_json),
        total_variants=total_variants,
        exac_variants=exac_variants,
        pass_variants=pass_variants,
        nonpass_variants=nonpass_variants,
        pass_exac_variants=pass_exac_variants,
        pass_nonexac_variants=pass_nonexac_variants,
        #image=image.decode('utf8'))
        image="",
        version_number=version_number)

