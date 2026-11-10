/* ==========================================================
   CHANDAN SAMANTA — PORTFOLIO DATA
   Edit this file to add / change experience, projects,
   certificates and skills. Everything on the page is
   generated from these arrays.
   ========================================================== */

/* ---------- CERTIFICATES (every document from your zip) ----------
   cat: internship | course | workshop | award
   file: original document in assets/certificates/
   prev: preview image in assets/previews/                       */
const CERTS = [
  /* ---- INTERNSHIPS ---- */
  { id:"cognifyz-data-engineering", cat:"internship", title:"Data Engineering Internship", org:"Cognifyz IT Solutions Pvt. Ltd.", date:"25 Aug – 25 Sep 2026", file:"cognifyz-data-engineering.jpeg", prev:"cognifyz-data-engineering.jpg" },
  { id:"oasis-completion", cat:"internship", title:"Data Science Internship — Completion", org:"Oasis Infobyte · AICTE OIB-SIP", date:"05 Aug – 15 Sep 2026", file:"oasis-completion.pdf", prev:"oasis-completion.jpg" },
  { id:"oasis-lor", cat:"internship", title:"Letter of Recommendation", org:"Oasis Infobyte", date:"15 Sep 2026", file:"oasis-lor.pdf", prev:"oasis-lor.jpg" },
  { id:"unified-mentor-internship", cat:"internship", title:"Machine Learning Internship", org:"Unified Mentor Pvt. Ltd.", date:"15 Jun – 15 Aug 2026", file:"unified-mentor-internship.pdf", prev:"unified-mentor-internship.jpg" },
  { id:"softnexis-ai-ml", cat:"internship", title:"AI & Machine Learning Internship", org:"Soft Nexis Technology · AICTE", date:"16 Jun – 16 Aug 2026", file:"softnexis-ai-ml.pdf", prev:"softnexis-ai-ml.jpg" },
  { id:"softnexis-app-dev", cat:"internship", title:"App Development Internship", org:"Soft Nexis Technology · AICTE", date:"16 Jun – 16 Aug 2026", file:"softnexis-app-dev.pdf", prev:"softnexis-app-dev.jpg" },
  { id:"codealpha-internship", cat:"internship", title:"Artificial Intelligence Internship", org:"CodeAlpha", date:"01 – 30 Apr 2026", file:"codealpha-internship.pdf", prev:"codealpha-internship.jpg" },
  { id:"codec-internship", cat:"internship", title:"Artificial Intelligence Internship", org:"Codec Technologies · AICTE & ICAC", date:"01 – 30 Apr 2026", file:"codec-internship.pdf", prev:"codec-internship.jpg" },
  { id:"codeflare-internship", cat:"internship", title:"AI & Automation Internship", org:"Codeflare Labs, Kolkata", date:"01 Jan – 01 Mar 2026", file:"codeflare-internship.pdf", prev:"codeflare-internship.jpg" },
  { id:"owl-ai-internship", cat:"internship", title:"AI/ML Research Internship", org:"Overload Ware Labs AI (OWL AI)", date:"01 – 31 Jan 2026", file:"owl-ai-internship.pdf", prev:"owl-ai-internship.jpg" },
  { id:"webel-linux", cat:"internship", title:"Advanced Linux — Summer Internship Training", org:"WEBEL, Kolkata", date:"Jun – Jul 2025", file:"webel-linux.png", prev:"webel-linux.jpg" },
  { id:"dataspace-cybersecurity", cat:"internship", title:"Cyber Security — Summer Training & Internship", org:"DataSpace Academy × The Neotia University", date:"20 Jul 2024", file:"dataspace-cybersecurity.jpeg", prev:"dataspace-cybersecurity.jpg" },

  /* ---- COURSES / TECHNICAL CERTIFICATIONS ---- */
  { id:"um-ai-professional", cat:"course", title:"Artificial Intelligence Professional", org:"Unified Mentor", date:"16 Aug 2026", file:"um-ai-professional.pdf", prev:"um-ai-professional.jpg" },
  { id:"um-computer-vision", cat:"course", title:"Computer Vision Professional", org:"Unified Mentor", date:"16 Sep 2026", file:"um-computer-vision.pdf", prev:"um-computer-vision.jpg" },
  { id:"um-nlp", cat:"course", title:"Natural Language Processing Professional", org:"Unified Mentor", date:"16 Sep 2026", file:"um-nlp.pdf", prev:"um-nlp.jpg" },
  { id:"um-robotics", cat:"course", title:"Robotics & Automation Professional", org:"Unified Mentor", date:"16 Sep 2026", file:"um-robotics.pdf", prev:"um-robotics.jpg" },
  { id:"infosys-iot", cat:"course", title:"Internet of Things", org:"Infosys Springboard", date:"25 Oct 2025", file:"infosys-iot.pdf", prev:"infosys-iot.jpg" },
  { id:"infosys-flutter", cat:"course", title:"Mobile App Development using Flutter", org:"Infosys Springboard", date:"28 Apr 2026", file:"infosys-flutter.pdf", prev:"infosys-flutter.jpg" },

  /* ---- WORKSHOPS ---- */
  { id:"aws-workshop", cat:"workshop", title:"AWS — 30 Hours Hands-on Training", org:"DataSpace Academy × The Neotia University", date:"25 Nov 2024 · Grade A+", file:"aws-workshop.jpeg", prev:"aws-workshop.jpg" },
  { id:"algorithm-workshop", cat:"workshop", title:"Basic Algorithm Development & Business Applications", org:"DataSpace Academy · School of Science & Technology, TNU", date:"One-day workshop", file:"algorithm-workshop.jpeg", prev:"algorithm-workshop.jpg" },
  { id:"nlp-clinical-workshop", cat:"workshop", title:"NLP in Clinical Practice — 20 Hour Workshop", org:"AI Labs", date:"From 08 Nov 2025", file:"nlp-clinical-workshop.jpeg", prev:"nlp-clinical-workshop.jpg" },
  { id:"django-mongodb-workshop", cat:"workshop", title:"Data Modelling for AI Apps with Django & MongoDB", org:"Kognitive Emerging Software Services", date:"11 – 12 May 2026 · 14 hours", file:"django-mongodb-workshop.jpeg", prev:"django-mongodb-workshop.jpg" },

  /* ---- AWARDS & RECOGNITION ---- */
  { id:"oasis-star-performer", cat:"award", title:"Star Performer — Certificate of Appreciation", org:"AICTE Oasis Infobyte Internship", date:"15 Sep 2026", file:"oasis-star-performer.pdf", prev:"oasis-star-performer.jpg" },
  { id:"debate-second-place", cat:"award", title:"2nd Place — Debate Competition", org:"PARIKALPANA 2K25 · The Neotia University", date:"16 Oct 2025", file:"debate-second-place.jpeg", prev:"debate-second-place.jpg" },
  { id:"parikalpana-participation", cat:"award", title:"Participation — PARIKALPANA 2K25 Tech-fest", org:"The Neotia University · Techniché Club", date:"16 Oct 2025", file:"parikalpana-participation.pdf", prev:"parikalpana-participation.jpg" }
];

/* ---------- EXPERIENCE (newest first) ---------- */
const EXPERIENCE = [
  { date:"Aug – Sep 2026", role:"Data Engineering Intern", org:"Cognifyz IT Solutions Pvt. Ltd.", place:"25 Aug – 25 Sep 2026",
    points:["Completed a one-month Data Engineering internship at Cognifyz IT Solutions.","Commended for dedication, sincerity, strong coordination, effective communication and attention to detail."],
    tags:["Data Engineering"], certs:["cognifyz-data-engineering"] },

  { date:"Aug – Sep 2026", role:"Data Science Intern", org:"Oasis Infobyte", place:"Remote · AICTE OIB-SIP", badge:"★ STAR PERFORMER",
    points:["Built Car Price and Sales Prediction models with EDA, feature engineering and scikit-learn.","Shipped an NLP spam-detection system using TF-IDF, plus an Unemployment Analysis with time-series and correlation studies.","Recognised as a Star Performer and received a Letter of Recommendation."],
    tags:["Python","scikit-learn","EDA","TF-IDF","Time-series"], certs:["oasis-completion","oasis-star-performer","oasis-lor"] },

  { date:"Jun – Aug 2026", role:"Machine Learning Intern", org:"Unified Mentor Pvt. Ltd.", place:"Remote",
    points:["Built a Teacher Rating predictor comparing Linear, Ridge, Random Forest and Gradient Boosting — Ridge selected as best model.","Delivered it as a reusable scikit-learn pipeline with a Streamlit app.","Completed four professional programs: AI, Computer Vision, NLP, and Robotics & Automation."],
    tags:["scikit-learn","Streamlit","Regression","Pipelines"], certs:["unified-mentor-internship","um-ai-professional","um-computer-vision","um-nlp","um-robotics"] },

  { date:"Jun – Aug 2026", role:"AI/ML & App Development Intern", org:"Soft Nexis Technology", place:"Remote · AICTE · MSME",
    points:["Two internship tracks completed: Artificial Intelligence & Machine Learning, and App Development.","Certified for strong coordination, effective communication and attention to detail while contributing to projects in both tracks."],
    tags:["AI / ML","App Development","Teamwork"], certs:["softnexis-ai-ml","softnexis-app-dev"] },

  { date:"Apr 2026", role:"AI & ML Intern — Deep Learning", org:"CodeAlpha  ×  Codec Technologies", place:"Remote · AICTE & ICAC approved",
    points:["Developed Deep Learning models for Computer Vision and RNN-based applications in Python and TensorFlow.","Implemented end-to-end workflows: data preprocessing, training and evaluation."],
    tags:["TensorFlow","CNN","RNN","Computer Vision"], certs:["codealpha-internship","codec-internship"] },

  { date:"Jan – Mar 2026", role:"AI & Automation Intern", org:"Codeflare Labs", place:"Sarat Pally, Kolkata",
    points:["Applied machine learning for data cleaning and feature engineering.","Built n8n workflows connecting LLMs and APIs into automated task-execution pipelines."],
    tags:["n8n","LLMs","APIs","Automation"], certs:["codeflare-internship"] },

  { date:"Jan 2026", role:"AI/ML Research Intern", org:"Overload Ware Labs AI (OWL AI)", place:"Remote",
    points:["Remote research internship in AI and ML, completed with excellent proficiency and professionalism."],
    tags:["AI Research","Machine Learning"], certs:["owl-ai-internship"] },

  { date:"Jun – Jul 2025", role:"Advanced Linux Trainee", org:"WEBEL", place:"New Town, Kolkata",
    points:["Trained in Linux system administration, network configuration, security policies and firewall management.","Hands-on exposure to virtualization and cloud deployment."],
    tags:["Linux","Networking","Firewalls","Virtualization"], certs:["webel-linux"] },

  { date:"Jul 2024", role:"Cyber Security — Summer Trainee", org:"DataSpace Academy × The Neotia University", place:"One-month summer training & internship",
    points:["Completed one-month summer training and internship in Cyber Security with grade “AA”."],
    tags:["Cyber Security","Training"], certs:["dataspace-cybersecurity","aws-workshop","algorithm-workshop"] }
];

/* ---------- PROJECTS ---------- */
const PROJECTS = [
  { title:"Smart Waste Classifier", meta:"Aug – Oct 2025 · Team Leader", desc:"End-to-end deep-learning waste classification using transfer learning (ResNet, DenseNet, EfficientNet), integrated with IoT hardware for a deployment-ready prototype.", tags:["TensorFlow","Transfer Learning","IoT"] },
  { title:"Real-Time Object Detection & Tracking", meta:"Feb – Apr 2026 · Team Leader", desc:"Multi-object detection and tracking on live video with YOLOv8 and SORT (optional DeepSORT). Boxes, track IDs, FPS and live counts; model variants benchmarked for accuracy vs. speed.", tags:["YOLOv8","SORT","OpenCV"] },
  { title:"LinguaFlow — Text-to-Speech Translator", meta:"Mar – Apr 2026 · Team Leader", desc:"Translate text and speak it aloud. Streamlit UI over a Flask REST backend (/translate, /speak, /swap) using Google Cloud Translation and gTTS.", tags:["Streamlit","Flask","gTTS","REST"] },
  { title:"AI Chatbot", meta:"Jul – Aug 2026 · Team Leader", desc:"Multi-turn chatbot on the Groq API with GPT-OSS 120B/20B and Llama 3.3 70B, Whisper voice-to-text and Google authentication.", tags:["Groq","Whisper","LLMs","Streamlit"] },
  { title:"Instructor Rating Predictor", meta:"Unified Mentor · ML + App", desc:"Predicts an instructor's expected rating and performance tier from experience and expertise. Compared four regressors, deployed the best pipeline in a Streamlit app.", tags:["Ridge","Random Forest","Streamlit"] },
  { title:"Unemployment Analysis — India", meta:"Oasis Infobyte · Data Science", desc:"EDA on monthly state-level unemployment (May 2019 – Jun 2020) measuring the COVID-19 lockdown impact, delivered as a notebook and an interactive Streamlit dashboard.", tags:["Pandas","EDA","Plotly","Streamlit"] },
  { title:"Intelligence Spell Checker", meta:"NLP · Transformers", desc:"AI spelling correction for typed exam answers: edit-distance and word-frequency candidates, re-ranked by a BERT masked-LM using sentence context.", tags:["BERT","NLP","Hugging Face"] },
  { title:"Iris Flower Classification", meta:"ML Fundamentals", desc:"Complete classification pipeline — EDA, visualisation, model training and evaluation — with a Streamlit app for live predictions.", tags:["scikit-learn","Visualisation","Streamlit"] },
  { title:"Water Optimization", meta:"ML · Data-driven insights", desc:"Machine-learning and data-driven analysis to surface insights for smarter water usage and optimisation.", tags:["Machine Learning","Data Analysis"] }
];

/* ---------- SKILLS ---------- */
const SKILLS = [
  { n:"01", title:"AI & Machine Learning", items:["Python","TensorFlow","scikit-learn","Keras","PyTorch","Model Evaluation","Feature Engineering","EDA"] },
  { n:"02", title:"Deep Learning & GenAI", items:["CNN","RNN","BERT","Transformers","LLMs","Hugging Face","LangChain","LangGraph","Agentic AI"] },
  { n:"03", title:"Computer Vision", items:["OpenCV","YOLOv8","SORT","ResNet","DenseNet","EfficientNet","Object Detection","Tracking"] },
  { n:"04", title:"Data & Cloud", items:["SQL (Oracle)","Pandas","NumPy","Supabase","MongoDB","AWS","Data Preprocessing"] },
  { n:"05", title:"Dev & Tools", items:["Java","C","JavaScript","R","Dart","HTML","Git","GitHub","Docker","Linux","Kali","Streamlit","Flask","n8n"] },
  { n:"06", title:"Embedded & Robotics", items:["Arduino","Raspberry Pi","ROS","Basic Electronics","IoT","Embedded AI"] }
];

/* words floating in the 3D skill sphere: [word, colour group] r=red b=blue p=purple w=white */
const SPHERE = [
  ["Python","w"],["TensorFlow","r"],["scikit-learn","b"],["OpenCV","r"],["YOLOv8","r"],["SORT","p"],["BERT","p"],["LangChain","b"],["LangGraph","b"],
  ["Deep Learning","r"],["Computer Vision","r"],["NLP","p"],["LLMs","p"],["Generative AI","p"],["Agentic AI","b"],["CNN","w"],["RNN","w"],
  ["Hugging Face","b"],["Keras","r"],["PyTorch","r"],["Pandas","w"],["NumPy","w"],["SQL","b"],["Streamlit","r"],["Flask","w"],["n8n","p"],
  ["Docker","b"],["Git","w"],["Linux","w"],["AWS","b"],["Supabase","p"],["MongoDB","b"],["Java","w"],["C","w"],["JavaScript","w"],["R","w"],["Dart","b"],
  ["Flutter","b"],["Arduino","r"],["Raspberry Pi","r"],["ROS","p"],["IoT","p"],["EDA","w"],["Whisper","p"],["Groq","r"],["ResNet","b"],["EfficientNet","b"]
];

/* ---------- RECOGNITION ---------- */
const HONORS = [
  { tag:"ACHIEVEMENT", title:"SIH 2026 Finalist", text:"Smart India Hackathon 2026 finalist." },
  { tag:"ACHIEVEMENT", title:"2nd Place — Internal Hackathon", text:"Runner-up in the internal hackathon at The Neotia University." },
  { tag:"ACHIEVEMENT", title:"4th Place — SANKALP", text:"Placed 4th at SANKALP, with a Project Showcase certificate at PARIKALPANA." },
  { tag:"ACHIEVEMENT", title:"2nd Place — Debate", text:"Debate runner-up, PARIKALPANA 2K25 tech-fest, 16 October 2025.", cert:"debate-second-place" },
  { tag:"RECOGNITION", title:"Oasis Infobyte — Star Performer", text:"Awarded Star Performer in the AICTE Oasis Infobyte internship for exceptional dedication.", cert:"oasis-star-performer" },
  { tag:"LEADERSHIP", title:"Technical Executive Committee Head", text:"Core member and Technical Executive Committee Head, TECHNICHE Club." },
  { tag:"LEADERSHIP", title:"IIC Coordinator", text:"Institution's Innovation Council coordinator at The Neotia University." },
  { tag:"PUBLICATION · ANURANAN", title:"Artificial Intelligence and Its Effect on Geopolitical Aspects", text:"A perspective within smart technologies for a sustainable world — college magazine ANURANAN, page 84." },
  { tag:"PUBLICATION · ANURANAN", title:"Beyond the Hype: Small Models, Strict Guardrails & Hyper-Personalization", text:"Defining the real AI revolution — ANURANAN, page 88, co-authored with Piyush Sharma." }
];

/* ---------- ROLES for the typing effect ---------- */
const ROLES = ["Machine Learning & Deep Learning Developer","Computer Vision Engineer","Agentic AI & GenAI Builder","NLP & Data Science Practitioner"];
