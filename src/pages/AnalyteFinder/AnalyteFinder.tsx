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
      compounds: ['abamectin','thca','d9_thc','d8_thc','thcv','thcva','cbda','cbd','cbdl','cbdv','cbdva','cbg','cbga','cbgv','cbgva','cbl','cbla','cbn','cbna','cbnm','cbc','cbca','cbt','vitamin_e','vitamin_e_acetate','nitrogen_phosphate_compounds','chlorinated_brominated_compounds','2_phenylphenol','3_hydroxycarbofuran','abamectin','acephate','acequinocyl','acetamiprid','acetochlor','acrinathrin','alachlor','aldicarb','aldicarb_sulfone','aldicarb_sulfoxide','aldrin','allethrin','alpha_bhc','alpha_hch_d6','ametoctradin','ametryn','amitraz','ancymidol','anilazine','aspon','asulam','atraton','atrazine','atrazine_d5','avermectin_b1a','avermectin_b1b','azadirachtin','azinphos_ethyl','azinophos_methyl','azoxystrobin','benalaxyl','bendiocarb','benfluralin','benoxacor','bensulide','benzovindiflupyr','benzoylprop_ethyl','beta_bhc','bifenazate','bifenox','bifenthrin','bitertanol','boscalid','bromacil','bromophos_ethyl','bromophos_methyl','bromopropylate','bromuconazole','bupirimate','buprofezin','butachlor','butralin','butylat','cadusafos','camphechlor','captafol','captan','carbamates','carbaryl','carbendazim','carbetamide','carbofuran','carbophenothion','carbophenothion_methyl','carboxine','carfentrazone_ethyl','chlorantraniliprole','chlorbensid','chlordane','chlordimeform','chlorfenapyr','chlorfenson','chlorfenvinphos','chloridazon','chlorinated_hydrocarbons','chlorinitrofen','chlormequat','chlormequat_chloride','chlorobenzilate','chloroneb','chlorpropham','chlorthal_dimethyl','chlorothalonil','chlorpyrifos','chlorpyrifos_methyl','cinerin_1','cinerin_2','cis_chlordane','cis_permethrin','cis_tefluthrin','clethodim','clethodim_sulfone','clethodim_sulfoxide','clomazone','clothianidin','clofentezine','coumaphos','crotoxyphos','cyanazine','cyanofenphos','cyanophos','cyantraniliprole','cyazofamid','cycloate','cyfluthrin','cyfluthrins','cyhalothrin','cymoxanil','cypermethrin','cyprodinil','daminozide','dcpmu','ddt','delta_bhc','deltamethrin','demeton_o_methyl','demeton_s','demeton_s_methyl','demeton_s_methyl_sulfon','desmedipham','di_allate','dialifos','diazinon','diazoxon','dichlobenil','dichlofenthion','dichlofluanid','dichlone','dichlorvos','dicofol','diclobutrazol','diclofop_methyl','dicloran','dicrotophos','dieldrin','dienochlor','diethofencarb','diethyltoluamid','difenoconazole','dimethachlor','dimethametryn','dimethenamid','dimethoate','dimethomorph','diniconazole','dinotefuran','dioxacarb','dioxathion','diphenamid','diphenylamine','disulfoton','disulfoton_sulfone','disulfoton_sulfoxide','ditalimfos','diuron','dodemorph','edifenphos','endosulfan','endosulfan_i','endosulfan_ii','endosulfan_sulfate','endrin','epn','eptc','esfenvalerate','etaconazol','ethalfluralin','ethephon','ethiofencarb','ethion','ethirimol','ethofumesate','ethoprophos','ethoxyquin','etofenprox','etoxazole','etridiazole','etrimfos','famoxadone','famphur','fenamidone','fenamiphos','fenamiphos_sulfone','fenamiphos_sulfoxide','fenarimol','fenazaquin','fenbuconazol','fenchlorphos','fenchlorphos_oxon','fenhexamid','fenitrothion','fenobucarb','fenoxycarb','fenpropathrin','fenpyroximate','fenson','fensulfothion','fensulfothion_oxon','fensulfothion_oxon_sulfone','fensulfothion_sulfone','fenthion','fenthion_oxon','fenthion_oxon_sulfone','fenthion_oxon_sulfoxide','fenthion_sulfone','fenthion_sulfoxide','fenuron','fenvalerate','fipronil','flamprop_isopropyl','flonicamid','fluchloralin','flucythrinate','fludioxonil','flufenacet','flumioxazin','fluometuron','fluopicolide','fluopyram','fluoxastrobin','flupyradifurone','fluridone','flurprimidol','flusilazole','flutolanil','flutriafol','fluxapyroxad','folpet','fomesafen','fonofos','forchlorfenuron','formetanate_hcl','furathiocarb','heptachlor','heptachlor_epoxide_isomer_a','heptachlor_epoxide_isomer_b','heptenophos','herbicides','hexachlorobenzene','hexaconazole','hexazinone','hexythiazox','imazalil','imidacloprid','imidoxone','indaziflam','indolebutyric_acid','indoxacarb','ipconazole','iprobenfos','iprodione','isazophos','isobenzan','isocarbophos','isodrin','isofenphos','isofenphos_methyl','isofenphos_oxon','isoprocarb','isopropalin','isoprothiolane','isoproturon','isoxaben','isoxaflutole','jasmolin_1','jasmolin_2','kinoprene','kresoxim_methyl','l_cyhalothrin','lactofen','lambda_cyhalothrin','lenacil','leptophos','lindane','linuron','malaoxon','malathion','mandipropamid','mecarbam','mepanipyrim','mephosfolan','mepronil','merphos','metalaxyl','metaldehyde','metasystox','metconazole','methamidophos','methacrifos','methidathion','methiocarb','methiocarb_sulfone','methiocarb_sulfoxide','methomyl','methoprene','methoprotryne','methoxychlor','methoxyfenozide','metobromuron','metolcarb','metolachlor','metrafenone','metribuzin','mevinphos','mexacarbate','mgk_264','mirex','midazolam','molinate','monocrotophos','monolinuron','monuron','myclobutanil','naled','napropamid','neburon','nitrapyrin','nitrobenzene','nitrofen','norflurazon','novaluron','nuarimol','ofurace','omethoate','op_ddd','organo_halides','organonitrogens','organophosphates','oxadixyl','oxadiazon','oxamyl','oxamyl_oxime','oxychlordane','oxydemeton_methyl','oxyfluorfen','oxythioquinox','paclobutrazol','paraoxon_ethyl','paraoxon_methyl','parathion_ethyl','parathion_methyl','pcb_153','pcb_28','pcb_52','pebulate','penconazole','pendimethalin','penflufen','pentachloroaniline','pentachloroanisole','pentachlorobenzene','pentachloronitrobenzene','pentachlorothioanisole','penthiopyrad','permethrin','permethrins','perthane','phenmedipham','phenothrin','phenthoate','phorate','phorate_oxon','phorate_sulfoxide','phosalone','phosmet','phosphamidon','phoxim','pinoxaden','piperonyl_butoxide','piperophos','pirimicarb','pirimiphos_ethyl','pirimiphos_methyl','pirimiphos_methyl_n_desethyl','plant_growth_regulators','pp_dde','prallethrin','prallethrin_1','prallethrin_2','prochloraz','procymidone','profenfos','profluralin','promecarb','prometon','prometryn','propachlor','propamocarb','propamocarb_hcl','propanil','propargite','propazine','propetamphos','propham','propiconazole','propiconazole_1','propiconazole_2','propoxur','propoxycarbazone_na','propyzamide','prothiofos','pyraclostrobin','pyrazophos','pyrethrin_1','pyrethrin_2','pyrethrins','pyridaben','pyridafol','pyridate','pyrimethanil','pyriproxifen','pyroxasulfone','pyroxsulam','quinalphos','quinoxyfen','quizalofop_ethyl','resmethrin','rotenone','s_421','safrole','secbumeton','sethoxydim','simazine','simetryn','spinetoram','spinosad','spinosyn_a','spinosyn_d','spirodiclofen','spiromesifen','spirotetramat','spirotetramat_enol','spiroxamine','striofos','sulfotep','sulfoxaflor','sulprofos','tau_fluvalinate','tebufenozide','tecnazene','terbacil','terbufos','terbufos_sulfone','terbufos_sulfoxide','terbumeton','terbuthylazine','terbutryn','tetradifon','tdcpp','tebuconazole','tebufenpyrad','tebuthiuron','teflubenzuron','tepp','tetraconazole','tetramethrin','tetrasul','thiabendazole','thiabendazole_5_oh','thiacloprid','thimet_sulfone','thiamethoxam','thiobencarb','thiodicarb','thiometon','thionazin','thiophanate_methyl','tolclofos_methyl','tolyfluanid','total_pesticides','toxaphene_8','toxaphene_9','tralkoxydim','trans_chlordane','trans_nonachlor','trans_permethrin','triadimefon','triadimenol','triallate','triazolam','triazophos','tribufos','trichlorfon','tricyclazole','tridiphane','trifloxystrobin','triflumizole','trifluralin','triforine','triphenyl_phosphate','tris_2_chloroethyl_phosphate','triticonazole','uniconazole','vinclozolin','zoxamide','aminocarb','butafenacil','chlorotoluron','chloroxuron','cycluron','cyproconazole','diflubenzuron','dimoxystrobin','emamectin_b1a','epoxiconazole','eprinomectin_b1b','ethiprole','fluazinam','fluquinconazole','fuberdiazole','furalaxyl','hexaflumuron','iprovalicarb','mefenacet','metaflumizone','methabenzthiazuron','nitenpyram','picoxystrobin','pyracarbolid','siduron','sulfentrazone','temephos','thidiazuron','triflumuron','vamidothion','neonicotinoids','acaricides','fungicides','aerobic_bacteria','aeromonas_spp','alternaria_spp','aspergillus','aspergillus_brasiliensis','aspergillus_flavus','aspergillus_fumigatus','aspergillus_niger','aspergillus_terreus','bacillus_spp','bacteria','botrytis_spp','btgn_bacteria','candida_albicans','candida_glabrata','cladosporium_spp','clostridium_botulinum','cfu','coliforms','ecoli','enterobacteriaceae','erysiphe','fusarium_spp','klebsiella_pneumoniae','listeria','mold','mold_only','mucor_spp','p_oxalicum','p_paxilli','penicillium_and_aspergillus_spp','penicillium_spp','phoma_eppicoccum_spp','podosphaera_spp','pseudomonas','pseudomonas_aeruginosa','rhodoturula_spp','salmonella','salmonella_spp','shigella_spp','stachybotrys_spp','staphylococcus_aureus','stx_gene_1','stx_gene_2','thermophilic_actinomycetes','total_candida','yeast','yeast_and_mold','blumeria','golovinomyces','saccharomyces','fusarium_oxysporum','fusarium_solani','aeromonas_hydrophilia_and_salmonicida','campylobacter_spp','candida_dubliniensis','1_4_cineole','2_pinanol','2_piperidone','3_carene','allo_ocimene','alpha_bisabolol','alpha_cedrene','alpha_eudesmol','alpha_guaiene','alpha_humulene','alpha_phellandrene','alpha_pinene','alpha_terpinene','beta_terpinene','alpha_terpineol','azulene','beta_terpineol','beta_caryophyllene','beta_elemene','beta_eudesmol','beta_farnesene','beta_myrcene','beta_phellandrene','beta_pinene','borneol','paren_-_paren_borneol','paren_+_paren_borneol','camphene','camphor','paren_1r_paren_+_paren_-_paren_-_camphor','paren_1r_paren_-_paren_-_paren_-_camphor','paren_1s_paren_-_paren_-_paren_-_camphor','caryophyllene_oxide','cedrol','cis_beta_farnesene','cis_nerolidol','cis_ocimene','cis_phytol','citral','citronellol','delta_guaiene','delta_limonene','eucalyptol','eugenol','endo_fenchyl_alcohol','farnesene','fenchol','fenchone','gamma_eudesmol','gamma_terpinene','gamma_terpineol','gamma_valerolactone','geraniol','geranyl_acetate','germacrene_b','guaiol','hexahydro_thymol','isoborneol','isopulegol','isophytol','l_fenchone','limonene','linalool','menthol','nerol','nerolidol','ocimene','ro_cymene','paren_-_paren_-_beta_pinene','paren_-_paren_alpha_bisabolol','paren_+_paren_-_dihydrocarveol','paren_+_paren_terpinen','phytol','positive_4_carene','positive_isopulegol','propyl_benzoate','pulegone','pulegol','r_positive_pulegone','s_paren_-_paren_limonene','sabinene','sabinene_hydrate','selina_3_7_11_diene','terpineol','terpinolene','trans_nerolidol','trans_ocimene','trans_terpin','valencene','unknown','unknown_monoterpenoids','unknown_sesquiterpenoids','anisole','neryl_acetate','neral','squalene','1_1_1_trichloroethane','1_1_1_2_tetrafluoroethane','1_1_dichloro_ethane','1_2_3_4_tetrahydronaphthalene','1_2_dichloro_ethane','1_2_dimethoxy_ethane','1_2_propanediol','1_4_dioxane','1_butanol','1_chloropropane','1_methyl_2_pyrrolidinone','1_pentanol','2_2_dimethyl_butane','2_2_dimethyl_pentane','2_3_dimethyl_butane','2_4_dimethyl_pentane','2_butanol','2_butanone','2_ethoxyethanol','2_hexanone','2_methoxyethanol','3_methyl_1_butanol','2_methyl_1_propanol','2_methylpentane','3_methylpentane','acetoin','acetone','acetonitrile','acetyl_propionyl','alcohols','alkalines','anisole','aromatics','benzene','butanes','butyl_acetate','carbon_tetrachloride','chlorobenzene','chloroform','cis_1_2_dichloroethane','cumene','cyclohexane','diacetyl','dichloro_methane','dimethyl_sulfoxide','ethane','ethanol','ethyl_acetate','ethyl_ether','ethyl_benzene','ethylene_glycol','ethylene_oxide','ethylformate','fluorobenzene','formamide','formic_acid','heptane','heptanes','hexanes','iso_butane','iso_octane','isobutyl_acetate','isopentane','isopropanol','isopropyl_acetate','methane','methanethiol','methanol','methyl_acetate','methyl_cyclohexane','methyl_isobutyl_ketone','n_butane','n_hexane','n_n_dimethylacetamide','n_n_dimethylfromamide','n_pentane','n_propanol','n_propyl_acetate','neopentane','nitromethane','non_usp_hydrocarbons','m_xylene','o_xylene','other_solvents','p_xylene','m_plus_p_xylene','pentanes','petroleum_ether','propane','pyridine','sulfolane','tert_butyl_methyl_ether','tetrahydrofuran','toluene','trans_1_2_dichloroethane','trichloroethene','xylenes','total_hydrocarbons','total_solvents','xylenes_plus_ethyl_benzene','aflatoxins','b1','b2','g1','g2','ochratoxin_a','ochratoxin_b','ochratoxin_c','total_aflatoxins','total_mycotoxins','total_ochratoxins','aluminum','antimony','arsenic','barium','beryllium','bismuth','boron','cadmium','calcium','chromium','cobalt','copper','iron','lead','lithium','magnesium','manganese','mercury','molybdenum','nickel','phosphorus','potassium','selenium','silver','sodium','strontium','sulfur','thallium','tin','titanium','uranium','vanadium','zinc','water_activity','homogeneity','stems','other','pests','ph','aluminum','boron','calcium','copper','iron','magnesium','manganese','molybdenum','nickel','nitrates','phosphorus','potassium','silicon','sodium','sulfate','sulfur','zinc','antimony','barium','beryllium','bismuth','chromium','cobalt','selenium','silver','strontium','thallium','tin','titanium','uranium','vanadium']
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
      let searchTerm = analytesToBeSearched[i]
      if ( !(searchResults[searchTerm]) ) { searchResults[searchTerm] = [] }
      let results: any = []
      for (let j = 0; j < compounds.length; j++) {
        let similarityRatio = stringSimilarity.compareTwoStrings(searchTerm, compounds[j])
        if (similarityRatio > 0.5) {
          results.push({ name: compounds[j], ratio: similarityRatio })
        }
      }
      searchResults[searchTerm] = results.sort((a: any, b: any) => {
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