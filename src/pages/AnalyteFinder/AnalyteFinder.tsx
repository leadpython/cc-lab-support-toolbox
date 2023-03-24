import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import './AnalyteFinder.css';
const stringSimilarity = require('string-similarity');

function deepClone(stuff: any) {
  return JSON.parse(JSON.stringify(stuff));
}

interface State {
  searchTerm: string,
  searchResults: any,
  compounds: any,
  analytes: any
}

function copyToClipboard() {
  document.execCommand('copy');
}

export default class AnalyteFinder extends Component<{}, State> {
  analytesRef: any
  constructor(props: any) {
    super(props);
    this.analytesRef = React.createRef();
    this.state = {
      searchTerm: '',
      searchResults: {},
      analytes: [],
      compounds: ["corynoxine","methylisobutylketone","methylbutylketone","xylene","1_propanol","pentane","2_methylbutane","methylethylketone","hexane","1_1_2_trichloroethylene","tetralin","propyl_acetate","2_propanol","n_methylpyrrolidone","methylpropane","1_4_dimethylbenzene","1_3_dimethylbenzene","1_2_dimethylbenzene","1_2_dichloroethene","d8_thca","2_2_dimethylpropane","psilocybe_cubensis","beta_endosulfan","alpha_endosulfan","dimethyltryptamine_n_oxide","psilacetin","5_methoxy_amt","5_methoxy_nmt","4_hydroxy_tmt","norpsilocin","bufotenine","5_hydroxy_nmt","cbdb","thd","cbe","psilocin","aeruginascin","baeocystin","butane","arabic_mosaic_virus","tomato_ringspot_virus","phytophtorta","hop_stunt_viroid","botrytis_cinerea","alfalfa_mosaic_virus","fusarlum_oxy","beet_curly_top_virus","ibotenic_acid","cbdhq","fusarium_proliferatum","propanes","exo_tetrahydrocannabinol","olivetol","9a_hydroxyhexahydrocannabinol","9s_hydroxyhexahydrocannabinol","9r_hydroxyhexahydrocannabinol","9_hydroxyhexahydrocannabinol","trichloronate","transfluthrin","stirofos","endrin_ketone","endrin_aldehyde","bioallethrin","anthraquinone","4_4_ddd","enterococcus","mucor_rhizopus_group","enterococcus_spp","clostridium_spp","hhc","visual_inspection","humulene","paren-paren_isopulegol","paren_1r_paren_endo_paren+paren_fenchyl_alcohol","beta_ocimene","paren_r_paren-paren+paren_limonene","paren_1S_paren-paren+paren-3_carene","trans_citral","cis_citral","hexahydrocannabinol","loss_on_drying","farnesol_2","farnesol_1","delta_valerolactam","carvone","paren_-_paren_verbenone","d_isomenthone","l_methone","alpha_thujone","nootkatone","thymol","isobornyl_acetate","piperitone","d_carvone","verbenone","octyl_acetate","safranal","delta_isomenthone","menthone","trichloroethylene","silicon","1_1_dichloroethene","external_cannabinoid_total","external_cbd_total","external_thc_total","speciociliatine","mitraphylline","7_hydroxymitragynine","trans_farnesol","terpinen_4_ol","phytane","o_cymene","m_cymene","cis_farnesol","carvacrol","beta_cedrine","beta_cedrene","d8_thc_acetate","d9_thc_acetate","coenzyme_q10","l_theanine","melatonin","vitamin_d3","vitamin_c","vitamin_b6","vitamin_b12","vitamin_a_acetate","vitamin_a","thiamin_b1","riboflavin_b2","niacin_b3","caffeine","serotonin","psilocybin","norbaeocystin","4_dmt","caffeine","vitamin_e_acetate","vitamin_e","lactic_acid_bacteria","thcp","thco","cbdp","speciogynine","paynantheine","mitragynine","7_oh","vaccenic_acid","stearidonic_acid","stearic_acid","palmitoleic_acid","palmitic_acid","oleic_acid","nervonic_acid","myristoleic_acid","myristic_acid","mead_acid","linoleic_acid","lignoceric_acid","lauroleic_acid","gamma_linoleic_acid","gadoleic_acid","erucic_acid","elaidic_acid","eicosapentaenoic_acid","dihomo_gamma_linolenic_acid","docosapentaenoic_acid","docosahexaenoic_acid","columbinic_acid","caprylic_acid","caproleic_acid","capric_acid","brassidic_acid","behenic_acid","arachidonic_acid","arachidic_acid","alpha_linoleic_acid","epigalocatechin","catechol","lavandulyl_acetate","dimethomorph_i","d7_thc","lettuce_chlorosis_virus","cannabis_cryptic_virus","d8_thcv","9r_d10_thc","9s_d10_thc","d10a_thc_isomers","vitexin","rutin","quercetin","orientin","myricetin","luteolin","kaempferol","isovitexin","chrysin","baicalin","apigenin","hop_latent_viroid","gender_detection","40k_single_nucleotide_polymorphism","23_single_nucleotide_polymorphism","shiga_toxin_ecoli","hop_latent_viroid","cbco","z_dimethomorph","spinetoram_l","spinetoram_j","linalyl_acetate","thujone","trans_caryophyllene","carbosulfan","chloracetophos","soil","sand","rodent_hair","mold","mammal_excrement","insect_fragments","imbedded","dirt","cinders","vitamin_e_acetate","p_mentha_1_5_diene","exo_thc","d10_thc","11_hydroxy_thc","tetrachlorvinphos","triethylamine","acetic_acid","olivetolic_acid","spinosyn_j","triclopyr","cbcv","vitamin_e_acetate","vitamin_e","fungicides","acaricides","neonicotinoids","candida_dubliniensis","campylobacter_spp","aeromonas_hydrophilia_and_salmonicida","squalene","neral","neryl_acetate","anisole","vamidothion","triflumuron","thidiazuron","temephos","sulfentrazone","siduron","pyracarbolid","picoxystrobin","nitenpyram","methabenzthiazuron","metaflumizone","mefenacet","iprovalicarb","hexaflumuron","furalaxyl","fuberdiazole","fluquinconazole","fluazinam","ethiprole","eprinomectin_b1b","epoxiconazole","emamectin_b1a","dimoxystrobin","diflubenzuron","cyproconazole","cycluron","chloroxuron","chlorotoluron","butafenacil","aminocarb","fusarium_solani","fusarium_oxysporum","saccharomyces","golovinomyces","blumeria","vanadium","uranium","titanium","tin","thallium","strontium","silver","selenium","cobalt","chromium","bismuth","beryllium","barium","antimony","cis_beta_farnesene","azulene","jasmolin_2","cinerin_2","positive_4_carene","limonene","gamma_valerolactone","propamocarb","chlormequat_chloride","m_plus_p_xylene","mepronil","zinc","sulfur","sulfate","sodium","silicon","potassium","phosphorus","nitrates","nickel","molybdenum","manganese","magnesium","iron","copper","calcium","boron","aluminum","jasmolin_1","cinerin_1","ochratoxin_c","ochratoxin_b","thermophilic_actinomycetes","clostridium_botulinum","teflubenzuron","phenothrin","novaluron","methoprene","kinoprene","indolebutyric_acid","dodemorph","benzovindiflupyr","terpineol","zoxamide","tridiphane","trans_chlordane","tralkoxydim","tolclofos_methyl","thiabendazole_5_oh","tetrasul","tetramethrin","tetraconazole","terbufos_sulfoxide","terbufos_sulfone","tecnazene","sulfoxaflor","spirotetramat_enol","spirodiclofen","s_421","rotenone","pyroxsulam","pyroxasulfone","pyriproxifen","pyridate","pyridafol","propoxycarbazone_na","propamocarb_hcl","prochloraz","pirimiphos_methyl_n_desethyl","pinoxaden","phorate_oxon","perthane","penthiopyrad","pentachlorothioanisole","pentachlorobenzene","pentachloroanisole","penflufen","penconazole","paraoxon_methyl","oxythioquinox","oxamyl_oxime","oxadixyl","op_ddd","nitrapyrin","neburon","mexacarbate","metrafenone","metolcarb","metobromuron","methacrifos","metconazole","metaldehyde","merphos","mepanipyrim","lambda_cyhalothrin","lactofen","isoxaflutole","isoxaben","isoproturon","isoprothiolane","isoprocarb","isofenphos_oxon","isofenphos_methyl","isodrin","isocarbophos","isobenzan","indoxacarb","indaziflam","imidoxone","hexaconazole","heptachlor_epoxide_isomer_a","furathiocarb","formetanate_hcl","forchlorfenuron","fomesafen","fluxapyroxad","flutriafol","flutolanil","flusilazole","fluridone","flupyradifurone","fluoxastrobin","fluopyram","fluopicolide","fluometuron","flumioxazin","flufenacet","flucythrinate","fenuron","fenthion_sulfoxide","fenthion_sulfone","fenthion_oxon_sulfoxide","fenthion_oxon_sulfone","fenthion_oxon","fensulfothion_sulfone","fensulfothion_oxon_sulfone","fensulfothion_oxon","fenchlorphos_oxon","fenazaquin","fenamiphos_sulfoxide","fenamiphos_sulfone","fenamidone","famoxadone","etridiazole","ethofumesate","ethirimol","ethiofencarb","disulfoton_sulfoxide","diniconazole","dimethenamid","diethyltoluamid","diethofencarb","diazoxon","delta_bhc","dcpmu","cymoxanil","cyazofamid","cyantraniliprole","cyanofenphos","crotoxyphos","clomazone","clethodim_sulfoxide","clethodim_sulfone","clethodim","cis_tefluthrin","cis_chlordane","chlorobenzilate","carfentrazone_ethyl","carbophenothion_methyl","buprofezin","bupirimate","bromuconazole","beta_bhc","benoxacor","benalaxyl","asulam","aspon","ametoctradin","alpha_bhc","acrinathrin","ph","sulfur","lithium","total_candida","pseudomonas_aeruginosa","klebsiella_pneumoniae","candida_glabrata","aspergillus_brasiliensis","cbla","2_piperidone","shigella_spp","mucor_spp","erysiphe","candida_albicans","cbna","azadirachtin","paren_1r_paren_+_paren_-_paren_-_camphor","beta_farnesene","formic_acid","staphylococcus_aureus","total_pesticides","cbgva","cbgv","zinc","vanadium","uranium","titanium","tin","thallium","strontium","sodium","potassium","phosphorus","nickel","molybdenum","manganese","magnesium","iron","copper","cobalt","calcium","boron","bismuth","beryllium","antimony","aluminum","stachybotrys_spp","rhodoturula_spp","podosphaera_spp","phoma_eppicoccum_spp","fusarium_spp","cladosporium_spp","botrytis_spp","bacillus_spp","alternaria_spp","aeromonas_spp","diacetyl","acetyl_propionyl","acetoin","flurprimidol","ethephon","ancymidol","silver","selenium","chromium","barium","allo_ocimene","beta_terpinene","petroleum_ether","pulegol","beta_terpineol","stx_gene_2","stx_gene_1","salmonella_spp","penicillium_spp","penicillium_and_aspergillus_spp","p_paxilli","p_oxalicum","xylenes_plus_ethyl_benzene","iso_octane","pp_dde","tebufenpyrad","ipconazole","eugenol","1_2_propanediol","mandipropamid","diuron","difenoconazole","aspergillus_terreus","selina_3_7_11_diene","propyl_benzoate","germacrene_b","delta_guaiene","beta_elemene","alpha_guaiene","2_pinanol","cis_phytol","heptanes","thiophanate_methyl","trichloroethene","nitromethane","formamide","anisole","3_methyl_1_butanol","2_methoxyethanol","2_hexanone","1_methyl_2_pyrrolidinone","1_2_3_4_tetrahydronaphthalene","aspergillus_fumigatus","aspergillus_flavus","aspergillus_niger","quinoxyfen","methane","1_chloropropane","isophytol","pests","other","stems","btgn_bacteria","yeast_and_mold","uniconazole","chlormequat","permethrins","organonitrogens","r_positive_pulegone","positive_isopulegol","tris_2_chloroethyl_phosphate","triphenyl_phosphate","triforine","trifluralin","triflumizole","tricyclazole","trichlorfon","tribufos","triazophos","triazolam","triallate","triadimenol","triadimefon","trans_nonachlor","tolyfluanid","thionazin","thiometon","thiodicarb","thiobencarb","thimet_sulfone","tetradifon","terbutryn","terbuthylazine","terbumeton","terbufos","terbacil","tebufenozide","tau_fluvalinate","sulprofos","sulfotep","simetryn","simazine","sethoxydim","secbumeton","resmethrin","quizalofop_ethyl","quinalphos","pyrimethanil","plant_growth_regulators","pyrazophos","prothiofos","propyzamide","propham","propetamphos","propazine","propanil","propachlor","prometryn","prometon","profluralin","profenfos","procymidone","pirimicarb","piperophos","phoxim","phosphamidon","phorate_sulfoxide","phorate","phenthoate","phenmedipham","pentachloroaniline","pendimethalin","pebulate","pcb_52","pcb_28","pcb_153","paraoxon_ethyl","oxyfluorfen","oxydemeton_methyl","oxychlordane","oxadiazon","organo_halides","ofurace","nuarimol","norflurazon","nitrofen","napropamid","monolinuron","molinate","midazolam","metribuzin","metolachlor","methoxyfenozide","methoprotryne","methiocarb_sulfoxide","methiocarb_sulfone","metasystox","mephosfolan","mecarbam","malaoxon","linuron","leptophos","lenacil","isopropalin","isofenphos","isazophos","iprobenfos","hexazinone","hexachlorobenzene","heptenophos","heptachlor_epoxide_isomer_b","heptachlor","fluchloralin","flamprop_isopropyl","fenson","fenobucarb","fenitrothion","fenbuconazol","fenamiphos","famphur","etrimfos","ethoxyquin","ethion","ethalfluralin","etaconazol","eptc","epn","endosulfan_sulfate","edifenphos","ditalimfos","disulfoton_sulfone","disulfoton","diphenylamine","diphenamid","dioxathion","dimethametryn","dimethachlor","dienochlor","dieldrin","dicrotophos","dicloran","diclofop_methyl","diclobutrazol","dichlone","dichlofenthion","dichlobenil","dialifos","di_allate","desmedipham","demeton_s_methyl_sulfon","demeton_s_methyl","demeton_s","demeton_o_methyl","cyhalothrin","cycloate","cyanophos","cyanazine","clothianidin","chlorthal_dimethyl","chlorpropham","chloroneb","chlorinitrofen","chloridazon","chlorfenvinphos","chlorfenson","chlordimeform","chlordane","chlorbensid","carboxine","carbophenothion","carbetamide","carbendazim","captafol","camphechlor","cadusafos","butylat","butralin","butachlor","bromopropylate","bromophos_methyl","bromophos_ethyl","bitertanol","bifenox","benzoylprop_ethyl","bensulide","benfluralin","bendiocarb","azinphos_ethyl","atraton","anilazine","amitraz","ametryn","alpha_hch_d6","allethrin","aldrin","aldicarb_sulfoxide","aldicarb_sulfone","alachlor","acetochlor","3_hydroxycarbofuran","cyfluthrins","butanes","1_1_1_2_tetrafluoroethane","cbl","avermectin_b1b","pentanes","n_pentane","fluorobenzene","paren_+_paren_-_dihydrocarveol","citral","triticonazole","toxaphene_9","toxaphene_8","tebuthiuron","safrole","monuron","monocrotophos","methoxychlor","methidathion","dioxacarb","bromacil","avermectin_b1a","atrazine_d5","atrazine","yeast","mold_only","other_solvents","aromatics","alkalines","alcohols","chlorinated_hydrocarbons","organophosphates","carbamates","total_aflatoxins","listeria","thcva","beta_phellandrene","dinotefuran","non_usp_hydrocarbons","homogeneity","endosulfan","water_activity","mercury","lead","cadmium","arsenic","total_mycotoxins","ochratoxin_a","g2","g1","b2","b1","aflatoxins","total_solvents","total_hydrocarbons","xylenes","trans_1_2_dichloroethane","toluene","tetrahydrofuran","tert_butyl_methyl_ether","sulfolane","pyridine","propane","p_xylene","o_xylene","m_xylene","neopentane","n_propyl_acetate","n_propanol","n_n_dimethylfromamide","n_n_dimethylacetamide","n_hexane","n_butane","methyl_isobutyl_ketone","methyl_cyclohexane","methyl_acetate","methanol","methanethiol","isopropyl_acetate","isopropanol","isopentane","isobutyl_acetate","iso_butane","hexanes","heptane","ethylformate","ethylene_oxide","ethylene_glycol","ethyl_benzene","ethyl_ether","ethyl_acetate","ethanol","ethane","dimethyl_sulfoxide","dichloro_methane","cyclohexane","cumene","cis_1_2_dichloroethane","chloroform","chlorobenzene","carbon_tetrachloride","butyl_acetate","total_ochratoxins","benzene","acetonitrile","acetone","3_methylpentane","2_methylpentane","2_methyl_1_propanol","2_ethoxyethanol","2_butanone","2_butanol","2_4_dimethyl_pentane","2_3_dimethyl_butane","2_2_dimethyl_pentane","2_2_dimethyl_butane","1_pentanol","1_butanol","1_4_dioxane","1_2_dimethoxy_ethane","1_2_dichloro_ethane","1_1_dichloro_ethane","1_1_1_trichloroethane","unknown_sesquiterpenoids","unknown_monoterpenoids","unknown","valencene","trans_terpin","trans_ocimene","trans_nerolidol","terpinolene","sabinene_hydrate","sabinene","s_paren_-_paren_limonene","phytol","pulegone","paren_+_paren_terpinen","paren_-_paren_alpha_bisabolol","paren_-_paren_-_beta_pinene","ro_cymene","ocimene","nerolidol","nerol","menthol","linalool","l_fenchone","isopulegol","isoborneol","hexahydro_thymol","guaiol","geranyl_acetate","geraniol","gamma_terpineol","gamma_terpinene","gamma_eudesmol","fenchone","fenchol","farnesene","endo_fenchyl_alcohol","eucalyptol","delta_limonene","citronellol","cis_ocimene","cis_nerolidol","cedrol","caryophyllene_oxide","paren_1s_paren_-_paren_-_paren_-_camphor","paren_1r_paren_-_paren_-_paren_-_camphor","camphor","camphene","paren_+_paren_borneol","paren_-_paren_borneol","borneol","beta_pinene","beta_myrcene","beta_eudesmol","beta_caryophyllene","alpha_terpineol","alpha_terpinene","alpha_pinene","alpha_phellandrene","alpha_humulene","alpha_eudesmol","alpha_cedrene","alpha_bisabolol","3_carene","1_4_cineole","pseudomonas","aspergillus","coliforms","salmonella","ecoli","aerobic_bacteria","enterobacteriaceae","bacteria","mold","cfu","vinclozolin","trifloxystrobin","trans_permethrin","thiamethoxam","thiacloprid","thiabendazole","tepp","tebuconazole","tdcpp","striofos","spiroxamine","spirotetramat","spiromesifen","spinosyn_d","spinosyn_a","spinosad","spinetoram","pyridaben","pyrethrins","pyrethrin_2","pyrethrin_1","pyraclostrobin","propoxur","propiconazole_2","propiconazole_1","propiconazole","propargite","promecarb","prallethrin_2","prallethrin_1","prallethrin","pirimiphos_methyl","pirimiphos_ethyl","piperonyl_butoxide","phosmet","phosalone","permethrin","pentachloronitrobenzene","parathion_methyl","parathion_ethyl","paclobutrazol","oxamyl","omethoate","nitrobenzene","naled","myclobutanil","mirex","mgk_264","mevinphos","methomyl","methiocarb","methamidophos","metalaxyl","malathion","l_cyhalothrin","kresoxim_methyl","iprodione","imidacloprid","imazalil","hexythiazox","lindane","fonofos","folpet","fludioxonil","flonicamid","fipronil","fenvalerate","fenthion","fensulfothion","fenpyroximate","fenpropathrin","fenoxycarb","fenhexamid","fenchlorphos","fenarimol","etoxazole","etofenprox","ethoprophos","esfenvalerate","endrin","endosulfan_ii","endosulfan_i","dimethomorph","dimethoate","dicofol","dichlorvos","dichlofluanid","diazinon","deltamethrin","ddt","daminozide","cyprodinil","cypermethrin","cyfluthrin","coumaphos","clofentezine","cis_permethrin","chlorpyrifos_methyl","chlorpyrifos","chlorothalonil","chlorfenapyr","chlorantraniliprole","carbofuran","carbaryl","captan","boscalid","bifenthrin","bifenazate","herbicides","azoxystrobin","azinophos_methyl","aldicarb","acetamiprid","acequinocyl","acephate","abamectin","2_phenylphenol","chlorinated_brominated_compounds","nitrogen_phosphate_compounds","cbt","cbca","cbc","cbnm","cbn","cbg","cbga","cbdva","cbdv","cbdl","cbd","cbda","thcv","d8_thc","d9_thc","thca","percent_moisture"]
    }
  }
  handleAnalyteInputChange(e: any) {
    this.setState({searchTerm: e.target.value})
  }
  handleSearch() {
    let analytesToBeSearched = this.state.searchTerm.toLowerCase().split(' ')
    let compounds = this.state.compounds
    let searchResults: any = {}
    for (let i = 0; i < analytesToBeSearched.length; i++) {
      let searchTerm = analytesToBeSearched[i].replace(/\d/g, '').replace(/,/g, '').replace(/-/g, '').replace(/_/g, '').trim()
      if ( !(searchResults[analytesToBeSearched[i]]) ) { searchResults[analytesToBeSearched[i]] = [] }
      let results: any = []
      for (let j = 0; j < compounds.length; j++) {
        let similarityRatio = stringSimilarity.compareTwoStrings(searchTerm, compounds[j])
        if (searchTerm.length > 0 && (similarityRatio > 0.5 || compounds[j].includes(searchTerm))) {
          results.push({ name: compounds[j], ratio: similarityRatio })
        }
      }
      searchResults[analytesToBeSearched[i]] = results.sort((a: any, b: any) => {
        return b.ratio - a.ratio
      }).map((analyte: any) => {
        return analyte.name
      })
    }
    this.setState({ searchResults, analytes: [] })
  }
  chooseAnalyte(analyte: any, key: string) {
    let analytes = deepClone(this.state.analytes)
    let searchResults = deepClone(this.state.searchResults)
    delete searchResults[key]
    analytes.push(analyte)
    this.setState({ analytes, searchResults })
  }
  addAnalyte(e: any, key: any) {
    if(e.key === 'Enter'){
      let analytes = deepClone(this.state.analytes)
      let searchResults = deepClone(this.state.searchResults)
      delete searchResults[key]
      analytes.push(e.target.value)
      this.setState({ analytes, searchResults })
    }
  }
  copyToClipboard() {
    this.analytesRef.current.select();
    copyToClipboard();
  }
  render() {
    return (
      <Grid container style={{flexGrow: 1}} >   

        {/* ROW */}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

          <Grid item xs={6}>
            <Paper className="config-box" elevation={6} square={true} style={{ position: 'relative', height: '52px', padding: '6px' }}>
              <input onChange={(e) => this.handleAnalyteInputChange(e)} className="analyte-input" placeholder="Analyte here..." />
              <Button variant="outlined" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => this.handleSearch()}>
                <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                  Search
                </Typography>
              </Button>
            </Paper>
          </Grid>
          
        </Grid>  

        {/* ROW */}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

          <Grid item xs={6}>
            <Paper className="config-box" elevation={6} square={true} style={{ position: 'relative', padding: '6px' }}>
              {(() => {
                let searchResultsComponents = []
                for (let key in this.state.searchResults) {
                  searchResultsComponents.push(
                    <div className="analyte">
                      <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', fontWeight: 'bold', padding: '5px' }}>
                        {key}
                      </Typography>
                      <div style={{ background: 'rgba(0,0,0,0.05', padding: '5px' }}>
                        {(() => {
                          let similarAnalytesComponents = []
                          for (let i = 0; i < this.state.searchResults[key].length; i++) {
                            similarAnalytesComponents.push(
                              <div className="analyte result" onClick={() => { this.chooseAnalyte(this.state.searchResults[key][i], key) }} >
                              <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                                {this.state.searchResults[key][i]}
                              </Typography>
                              </div>
                            )
                          }
                          similarAnalytesComponents.push(
                            <div className="analyte result">
                              <input type="text" onKeyDown={(e) => { this.addAnalyte(e, key); }}/>
                            </div>
                          )
                          return similarAnalytesComponents
                        })()}
                      </div>
                    </div>
                  )
                }
                return searchResultsComponents
              })()}
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className="config-box" elevation={6} square={true} style={{ position: 'relative', padding: '6px' }}>
              {(() => {
                let analytesComponents = []
                for (let i = 0; i < this.state.analytes.length; i++) {
                  analytesComponents.push(
                    <div className="analyte">
                      <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                        {this.state.analytes[i]}
                      </Typography>
                    </div>
                  )
                }
                return analytesComponents
              })()}
            </Paper>
          </Grid>          
          
        </Grid> 

        {/* ROW */}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>

          {/* UPDATED CONFIG */}
          <Grid item xs={3}>
            <Paper className="config-box" elevation={6} square={true}>
              <Grid container>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '15px', padding: '15px' }}>
                    Analytes
                  </Typography>
                  <Button variant="outlined" style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => this.copyToClipboard()}>
                    <Typography className="easy-font" style={{ fontFamily: 'Open Sans', fontSize: '12px' }}>
                      COPY
                    </Typography>
                  </Button>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} style={{ height: '70px' }}>
                  <textarea className="config-textarea simple-scrollbar" ref={this.analytesRef} value={JSON.stringify(this.state.analytes)}></textarea>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
        </Grid> 
        
      </Grid>
    );
  }
}