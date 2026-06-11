/* ═══════════════════════════════════════
   DrukShift — Main JavaScript
   Kinzang Choden · BDS Internship 2026
═══════════════════════════════════════ */

// HERO SLIDESHOW
var slideCaptions=['Bhutan · Mountains · Heritage','Blockchain · Technology · Future','Digital Finance · Crypto · Innovation','Data · Technology · Bhutan','Crypto · Readiness · DrukShift'];
var currentSlide=0,totalSlides=5,slideTimer=null,slideCaptions=['Bhutan · Mountains · Heritage','Crypto · Digital Finance · Future','Blockchain · Technology · Bhutan','Data · Research · DrukShift','Readiness · GNH · Happiness'];
function goToSlide(n){
    var slides=document.querySelectorAll('.hero-slide'),dots=document.querySelectorAll('.hero-dot');
    if(!slides.length)return;
    // Outgoing slide — scale up and fade out
    slides[currentSlide].style.transition='opacity 0.5s ease,transform 0.5s ease';
    slides[currentSlide].style.transform='scale(1.12)';
    slides[currentSlide].style.opacity='0';
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide=(n+totalSlides)%totalSlides;
    // Incoming slide — reset then animate in
    slides[currentSlide].style.transition='none';
    slides[currentSlide].style.transform='scale(1.04)';
    slides[currentSlide].style.opacity='0';
    setTimeout(function(){
        slides[currentSlide].style.transition='opacity 0.8s cubic-bezier(0.4,0,0.2,1),transform 2s ease-out';
        slides[currentSlide].style.transform='scale(1)';
        slides[currentSlide].style.opacity='1';
        slides[currentSlide].classList.add('active'); 
    }, 30);
    dots[currentSlide].classList.add('active');
    var cap=document.getElementById('heroCaption');
    if(cap){cap.style.opacity='0';setTimeout(function(){cap.textContent=slideCaptions[currentSlide];cap.style.opacity='1';},300);}
}
function nextSlide(){goToSlide(currentSlide+1);} //goes to next slide
function startSlideshow(){stopSlideshow();slideTimer=setInterval(nextSlide,4500);} //automaticaly slides change every 4.5 secoinds
function stopSlideshow(){if(slideTimer){clearInterval(slideTimer);slideTimer=null;}}
startSlideshow();
window.addEventListener('DOMContentLoaded',function(){var hero=document.querySelector('.hero');if(hero){hero.addEventListener('mouseenter',stopSlideshow);hero.addEventListener('mouseleave',startSlideshow);}});

// RESOURCES TABS
function resTab(tab,btn){document.querySelectorAll('.res-content').forEach(function(el){el.classList.remove('active');});document.querySelectorAll('.res-tab').forEach(function(el){el.classList.remove('active');});document.getElementById('res-'+tab).classList.add('active');btn.classList.add('active');}
//switch between different resource sections eg:if user clicks articles, viidoes or reports, only one tab remains visible 

// ✅ SIMPLE EMAIL VALIDATION
var currentUser = { name: '', email: '' }; //stores user information 
var API_BASE = 'https://drukshift-vakend.onrender.com'; //your frontend talks to this server

function startQuiz() { //validate name and email before allowing quiz 
    var name  = document.getElementById('userName').value.trim();
    var email = document.getElementById('userEmail').value.trim(); 
    //get user inputs 
    var emailError = document.getElementById('emailError');

    if (!name) { alert('Please enter your name.'); return; } // check if name exists

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //validate the email
    if (!email || !emailRegex.test(email)) {
        emailError.style.display = 'block';
        document.getElementById('userEmail').style.borderColor = 'var(--red)';
        return;
    }

    emailError.style.display = 'none';
    document.getElementById('userEmail').style.borderColor = '#dce6f0';
    currentUser.name  = name;
    currentUser.email = email;
    //store user
    document.getElementById('userInfoWrap').style.display = 'none'; //hide form
    document.getElementById('quizWrap').style.display     = 'block';
    qRender(); //show quiz 
} 

// Allow pressing Enter to start quiz
document.addEventListener('DOMContentLoaded', function() {
    var emailInput = document.getElementById('userEmail');
    if (emailInput) {
        emailInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') startQuiz();
        });
    }
    var nameInput = document.getElementById('userName');
    if (nameInput) {
        nameInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') startQuiz();
        });
    }
});

async function saveQuizResult(score, answers) { // send quiz result to backend 
    try {
        await fetch(API_BASE + '/api/quiz', { //fetch means to send name, email,score and answers to api/quiz 
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: currentUser.name, email: currentUser.email, score: score, answers: answers })
        });
        console.log('Quiz result saved ✅');
    } catch (err) { console.error('Could not save result', err); }
}

async function fetchHistory(score) { //retrieve previous quiz attempts 
    try {
        var res  = await fetch(API_BASE + '/api/quiz/' + encodeURIComponent(currentUser.email));
        if (!res.ok) return;
        var data = await res.json();
        if (data.history && data.history.length > 1) {
            var prev = data.history[1].score;
            var diff = score - prev;
            document.getElementById('qHistoryBox').innerHTML =
                '<div style="background:#e1f5ee;border-radius:10px;padding:16px;margin-bottom:16px;text-align:center;">' +
                '<div style="font-size:12px;color:#085041;font-weight:600;margin-bottom:4px;">📊 Your Progress</div>' +
                '<div style="font-size:22px;font-weight:700;color:#085041;">Last time: ' + prev + '% → Now: ' + score + '% ' +
                (diff > 0 ? '📈 +' + diff + '%' : diff < 0 ? '📉 ' + diff + '%' : '➡️ Same') + '</div></div>';
        }
    } catch (err) { console.error('Could not fetch history', err); }
}

// MODALS — ALL OPEN IN NEW TAB
function openGNHModal(){window.open('https://public.tableau.com/views/Tableaucryptoreadiness/Story2?:language=en-GB&:display_count=n&:origin=viz_share_link','_blank');}
function openReadinessModal(){window.open('https://public.tableau.com/views/Tableaucryptoreadiness/Story1?:language=en-GB&:display_count=n&:origin=viz_share_link','_blank');}
function openSolutionsModal(){window.open('https://public.tableau.com/views/Tableaucryptoreadiness/Story4?:language=en-GB&:display_count=n&:origin=viz_share_link','_blank');}
function openFindingsModal(){window.open('https://public.tableau.com/views/Tableaucryptoreadiness/Story4?:language=en-GB&:display_count=n&:origin=viz_share_link','_blank');}
function openScamModal(){window.open('https://public.tableau.com/views/Tableaucryptoreadiness/Story4?:language=en-GB&:display_count=n&:origin=viz_share_link','_blank');}
//open tableau dashboards window.open(url,'_blank' means opens in new browser tab)
function closeGNHModal(){}
function closeReadinessModal(){}
function closeScamModal(){}
function closeSolutionsModal(){}
function closeModal(){}
function closeFindingsModal(){}
function closeViz(){}
function handleOverlayClick(){}
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeGNHModal();closeReadinessModal();closeScamModal();closeSolutionsModal();closeModal();}});

// QUIZ
var qQuestions=[ //stores all 10 readiness questions.
    {text:"How familiar are you with what cryptocurrency is?",area:"Knowledge"},
    {text:"How confident are you in your ability to use features, functions or tools of a crypto wallet?",area:"Technical Skill"},
    {text:"How much do you trust cryptocurrency as a reliable form of digital money?",area:"Trust"},
    {text:"How aware are you of the risks associated with cryptocurrency?",area:"Security Awareness"},
    {text:"How ready do you feel personally to start transacting with cryptocurrency?",area:"Personal Readiness"},
    {text:"How reliable is your internet connection for daily digital activities?",area:"Infrastructure"},
    {text:"How comfortable are you with digital financial tools such as mobile banking?",area:"Digital Comfort"},
    {text:"Have you heard about the cryptocurrency regulations?",area:"Regulatory Awareness"},
    {text:"How willing are you to adopt cryptocurrency if it becomes safe and widely accepted in Bhutan?",area:"Adoption Willingness"},
    {text:"How much do you think cryptocurrency could positively contribute to Bhutan's development?",area:"GNH Alignment"}
];
var qColors={'Knowledge':'#2a6aad','Technical Skill':'#2a9d8f','Trust':'#e9c46a','Security Awareness':'#e63946','Personal Readiness':'#9b5de5','Infrastructure':'#f4a261','Digital Comfort':'#2a9d8f','Regulatory Awareness':'#d4537e','Adoption Willingness':'#2a9d8f','GNH Alignment':'#e9c46a'};
//each question also belongs to a category of knowledge. trust, infrastructure, ngh alighment 
var qCurrent=0,qAnswers=[];
for(var i=0;i<qQuestions.length;i++){qAnswers.push(null);}

function qRender(){ //display current question like progress bar, question number, category, likertscale button
    var q=qQuestions[qCurrent],pct=Math.round((qCurrent/qQuestions.length)*100);
    document.getElementById('qProgressText').textContent='Question '+(qCurrent+1)+' of '+qQuestions.length;
    document.getElementById('qProgressPct').textContent=pct+'%';
    document.getElementById('qProgressFill').style.width=pct+'%';
    document.getElementById('qDomain').textContent=q.area;
    document.getElementById('qText').textContent=q.text;
    var row=document.getElementById('qLikertRow');row.innerHTML='';
    for(var n=1;n<=10;n++){(function(val){var btn=document.createElement('button');btn.className='q-likert-btn'+(qAnswers[qCurrent]===val?' selected':'');btn.textContent=val;btn.type='button';btn.onclick=function(){qSelect(val);};row.appendChild(btn);})(n);}
    //creates buttons of likert scale using for (var n=1)
    document.getElementById('qPrevBtn').style.visibility=qCurrent>0?'visible':'hidden';
    document.getElementById('qNextBtn').disabled=(qAnswers[qCurrent]===null);
    document.getElementById('qNextBtn').textContent=qCurrent===qQuestions.length-1?'See my results →':'Next →';
}

function qSelect(val){ // example user clicks 8
    qAnswers[qCurrent]=val; //highlights selected button
    var btns=document.querySelectorAll('.q-likert-btn');
    for(var i=0;i<btns.length;i++){btns[i].className='q-likert-btn'+(parseInt(btns[i].textContent)===val?' selected':'');}
    document.getElementById('qNextBtn').disabled=false; //enables next button
}
function qNext(){if(qCurrent<qQuestions.length-1){qCurrent++;qRender();}else{qShowResults();}} //enables next button move forward
function qPrev(){if(qCurrent>0){qCurrent--;qRender();}} //move backward

function qShowResults(){ //most important quiz function
    var total=0;
    for(var i=0;i<qAnswers.length;i++){total+=qAnswers[i];}
    var score=Math.round((total/100)*100),diff=score-80; //10 questions *10 =100. 80% is the DrukShift benchmark
    saveQuizResult(score,qAnswers); //saves quiz result
    setTimeout(function(){fetchHistory(score);},2000); //fetch history
    document.getElementById('quizWrap').style.display='none';
    document.getElementById('qResultWrap').style.display='block';
    setTimeout(function(){ var el=document.getElementById('nextStepFindings'); if(el){el.style.opacity='1';el.style.animation='fadeUp 0.6s ease both';} }, 1500);
    document.getElementById('qScoreNum').textContent=score;
    document.getElementById('qYourPct').textContent=score+'%';
    document.getElementById('qVsAvg').textContent=(diff>=0?'+':'')+diff+'%';
    var circle=document.getElementById('qScoreCircle'),title,desc;
    if(score>=80){circle.className='q-score-circle high';title='You are highly ready!';desc='Your readiness is at or above the Bhutan average of 80%. You have strong knowledge, confidence and willingness to adopt cryptocurrency safely.';}
    //shows you are highly ready
    else if(score>=60){circle.className='q-score-circle mid';title='You are somewhat ready';desc='You have a solid foundation but some areas need strengthening. Targeted education and practice will help you reach full readiness.';}
   //shows you are somewhat ready
    else{circle.className='q-score-circle low';title='You need more support';desc='Your readiness is below the Bhutan average. With the right education, awareness and support you can improve significantly.';}
   //shows you need more support
    document.getElementById('qResultTitle').textContent=title;
    document.getElementById('qResultDesc').textContent=desc;
    var dContainer=document.getElementById('qDomainBars');
    dContainer.innerHTML='<div style="font-size:13px;font-weight:600;color:var(--navy);margin-bottom:12px;">Your score by readiness area</div>';
    for(var i=0;i<qQuestions.length;i++){var dpct=Math.round((qAnswers[i]/10)*100),color=qColors[qQuestions[i].area]||'#888';dContainer.innerHTML+='<div class="q-domain-row"><div class="q-domain-label"><span>'+qQuestions[i].area+'</span><span>'+qAnswers[i]+'/10</span></div><div class="q-domain-track"><div class="q-domain-fill" style="width:'+dpct+'%;background:'+color+'"></div></div></div>';}
    setTimeout(function(){ document.getElementById('qResultWrap').scrollIntoView({behavior:'smooth', block:'start'}); }, 100);
    qsRenderAll(score, qAnswers); //creates personalized bar. Example : knowledge 8/10, trust 5/10 but with bars 

    // ── GAMIFICATION — BADGE LOGIC ──
    var badgeEmoji, badgeTitle, badgeSubtitle, badgeStars; //badge system 
    if (score >= 90) {
        badgeEmoji    = '💎';
        badgeTitle    = 'Crypto Champion';
        badgeSubtitle = 'Top scorer — you are in the top 10% of all quiz takers!';
        badgeStars    = '⭐⭐⭐⭐⭐';
    } else if (score >= 70) {
        badgeEmoji    = '🥇';
        badgeTitle    = 'Crypto Ready';
        badgeSubtitle = 'You are above the Bhutan average of 80%!';
        badgeStars    = '⭐⭐⭐⭐';
    } else if (score >= 50) {
        badgeEmoji    = '🥈';
        badgeTitle    = 'Crypto Aware';
        badgeSubtitle = 'Good foundation — keep learning and improving!';
        badgeStars    = '⭐⭐⭐';
    } else {
        badgeEmoji    = '🥉';
        badgeTitle    = 'Crypto Curious';
        badgeSubtitle = 'Great start — your readiness journey begins here!';
        badgeStars    = '⭐⭐';
    }

    document.getElementById('badgeEmoji').textContent    = badgeEmoji;
    document.getElementById('badgeTitle').textContent    = badgeTitle;
    document.getElementById('badgeSubtitle').textContent = badgeSubtitle;
    document.getElementById('badgeStars').textContent    = badgeStars;

    // Badge card border color by level //badge color 
    var badgeCard = document.getElementById('badgeCard');
    if (badgeCard) {
        if (score >= 90) badgeCard.style.borderColor = '#2a9d8f';
        else if (score >= 70) badgeCard.style.borderColor = '#e9c46a';
        else if (score >= 50) badgeCard.style.borderColor = '#c0c0c0';
        else badgeCard.style.borderColor = '#cd7f32';
    }

    updateRoadmap(score);
    updateStreak();
    updateXP(100);

    // Show achievement popup
    setTimeout(function() {
        showAchievement(badgeEmoji, badgeTitle, 'Score: ' + score + '% — ' + badgeSubtitle);
    }, 1000);

    // Level up confetti if above average
    if (score >= 80) {
        setTimeout(function() { showLevelUp('Above Bhutan average! 🇧🇹'); }, 2000);
    }
}

function qRestart(){
    qCurrent=0;
    for(var i=0;i<qAnswers.length;i++){qAnswers[i]=null;}
    document.getElementById('qResultWrap').style.display='none';
    document.getElementById('qHistoryBox').innerHTML='';
    document.getElementById('emailError').style.display='none';
    document.getElementById('userEmail').style.borderColor='#dce6f0';
    document.getElementById('userInfoWrap').style.display='block';
}

// SOLUTIONS ENGINE
var qsCurrentFilter='all',qsCurrentScore=65,qsCurrentAnswers=[];

// Each solution maps to specific question indices (0-based) and has a "because" template
var qsSolutions=[ //this is the recommendation database.Each solution contains title, sections, impact, gnh domains like linked go question 4
    {
        id:'knowledge',category:'education',
        title:'Build your crypto knowledge from scratch',
        questionIndex:0, // Q1 — Knowledge
        urgentBelow:60,mediumBelow:80,
        because:'You rated your cryptocurrency knowledge as {score}/10 (Question 1 — Knowledge). This means you may not yet have a solid enough foundation to make safe decisions about crypto.',
        body:'Without understanding the basics, it is easy to make costly mistakes or fall for scams. The good news is that knowledge is the fastest thing to improve.',
        actions:['Watch 3 beginner videos on Bitcoin and blockchain this week','Read the Royal Monetary Authority of Bhutan\'s official statements on digital assets','Follow one trusted crypto education source — avoid anyone promising quick profits'],
        gnh:['Education','Living Standards'],impact:'+8 to +15 points'
    },
    {
        id:'wallet',category:'education',
        title:'Practice using a crypto wallet before using real money',
        questionIndex:1, // Q2 — Technical Skill
        urgentBelow:50,mediumBelow:70,
        because:'You rated your crypto wallet confidence as {score}/10 (Question 2 — Technical Skill). Low technical confidence is one of the biggest barriers to safe adoption.',
        body:'Technical confidence comes from practice, not reading. Try a demo wallet where no real money is involved — get comfortable before committing actual funds.',
        actions:['Download a reputable demo wallet app and set it up with practice funds','Try sending and receiving small demo amounts between two accounts','Learn what a private key and seed phrase are — and never share them with anyone'],
        gnh:['Education','Psychological Wellbeing'],impact:'+5 to +10 points'
    },
    {
        id:'trust',category:'education',
        title:'Understand why trust in crypto needs to be earned — not assumed',
        questionIndex:2, // Q3 — Trust
        urgentBelow:50,mediumBelow:70,
        because:'You rated your trust in cryptocurrency as {score}/10 (Question 3 — Trust). Either very low or very high trust can be risky — healthy skepticism protects you.',
        body:'Trust in crypto should be based on evidence, not emotion. Learn how the technology actually works, what protections exist, and what the risks are before making any financial decisions.',
        actions:['Research how blockchain transactions are verified and why they are hard to fake','Learn about the difference between regulated and unregulated crypto platforms','Only trust platforms and exchanges that are officially registered and reviewed'],
        gnh:['Psychological Wellbeing','Governance'],impact:'+5 to +8 points'
    },
    {
        id:'scam',category:'security',
        title:'Protect yourself from crypto scams — awareness is your best defence',
        questionIndex:3, // Q4 — Security Awareness
        urgentBelow:70,mediumBelow:85,
        because:'You rated your security awareness as {score}/10 (Question 4 — Security Awareness). Our DrukShift data shows that low security awareness is the number one factor that leads to financial loss in crypto.',
        body:'High awareness of crypto does not mean high safety. Scammers specifically target people who are curious but not yet security-savvy.',
        actions:['Learn the top 5 crypto scams — fake apps, pump and dump, phishing links','Never share your PIN, password or seed phrase with anyone — ever','If something promises guaranteed returns — walk away immediately','Verify every app and website URL before entering any financial information'],
        gnh:['Psychological Wellbeing','Governance'],impact:'+7 to +12 points'
    },
    {
        id:'readiness',category:'education',
        title:'Build your personal readiness step by step — do not rush',
        questionIndex:4, // Q5 — Personal Readiness
        urgentBelow:55,mediumBelow:75,
        because:'You rated your personal readiness to transact with crypto as {score}/10 (Question 5 — Personal Readiness). Feeling unready is valid — it means you are being honest with yourself, which is the first step to safe adoption.',
        body:'Personal readiness is about more than knowing what crypto is — it means feeling confident, informed, and secure enough to act. That confidence is built gradually.',
        actions:['Make a personal crypto learning plan — 30 minutes a week for 2 months','Complete at least one full crypto basics course before transacting any real money','Talk to someone you trust who already uses crypto safely and ask about their experience'],
        gnh:['Psychological Wellbeing','Education'],impact:'+6 to +12 points'
    },
    {
        id:'internet',category:'infrastructure',
        title:'Improve your internet reliability before transacting with crypto',
        questionIndex:5, // Q6 — Infrastructure
        urgentBelow:60,mediumBelow:75,
        because:'You rated your internet reliability as {score}/10 (Question 6 — Infrastructure). Poor internet is the number one practical barrier to safe crypto adoption in Bhutan — an interrupted transaction can result in lost funds.',
        body:'Reliable internet is not optional for crypto — it is a safety requirement. A dropped connection during a transaction can cause real financial harm.',
        actions:['Test your internet speed — you need at least 5 Mbps for safe crypto transactions','If rural — contact NDCA or Bhutan Telecom about rural broadband programs','Never transact crypto on public WiFi — use mobile data or a trusted home connection only','Advocate in your community for improved internet — it benefits everyone'],
        gnh:['Living Standards','Community Vitality'],impact:'+6 to +10 points'
    },
    {
        id:'digital',category:'education',
        title:'Get comfortable with digital finance tools first',
        questionIndex:6, // Q7 — Digital Comfort
        urgentBelow:55,mediumBelow:75,
        because:'You rated your comfort with digital financial tools as {score}/10 (Question 7 — Digital Comfort). If mobile banking still feels unfamiliar, crypto will feel even harder — building digital finance confidence first makes crypto adoption much safer.',
        body:'Cryptocurrency is more complex than mobile banking. If digital finance tools feel uncomfortable, start there first before moving to crypto.',
        actions:['Use your mobile banking app every day for one month — explore all its features','Enable two-factor authentication on all your digital finance accounts','Practice sending and receiving small amounts using existing digital tools you trust'],
        gnh:['Education','Living Standards'],impact:'+5 to +9 points'
    },
    {
        id:'regulation',category:'governance',
        title:'Stay informed about Bhutan\'s cryptocurrency regulations',
        questionIndex:7, // Q8 — Regulatory Awareness
        urgentBelow:65,mediumBelow:80,
        because:'You rated your regulatory awareness as {score}/10 (Question 8 — Regulatory Awareness). Not knowing the legal status of crypto in Bhutan puts you at serious risk — you could unknowingly break the law or lose money with no legal protection.',
        body:'Many Bhutanese adults are unaware of the legal status of cryptocurrency. Before adopting anything, understand what is permitted, what is regulated, and what consumer protections exist.',
        actions:['Visit the Royal Monetary Authority website and search for digital asset guidelines','Follow official government announcements on cryptocurrency policy','Ask your bank directly — what is their position on crypto-linked transactions?','Join community meetings where digital finance is discussed'],
        gnh:['Governance','Community Vitality'],impact:'+5 to +8 points'
    },
    {
        id:'community',category:'community',
        title:'Start with your community — let trust and adoption grow naturally',
        questionIndex:8, // Q9 — Adoption Willingness
        urgentBelow:100,mediumBelow:100,
        because:'You rated your willingness to adopt crypto as {score}/10 (Question 9 — Adoption Willingness). Whether your score is high or low, community adoption is always the most sustainable path forward in Bhutan\'s GNH context.',
        body:'DrukShift found most Bhutanese said Maybe — not No. These undecided people are waiting to see crypto working safely in real life. You can help by starting conversations.',
        actions:['Talk to one trusted friend or family member about what you have learned','Share the DrukShift readiness quiz with your network — more data helps Bhutan','Think GNH-first — ask how this technology serves your community, not just you','Identify one local business willing to explore crypto payments in future'],
        gnh:['Community Vitality','Time Use','Education'],impact:'Multiplies over time'
    }
];

function qsFilter(cat,btn){
    qsCurrentFilter=cat;
    document.querySelectorAll('.qs-filter').forEach(function(b){b.classList.remove('active');});
    btn.classList.add('active');
    qsRenderSolutions(qsCurrentScore, qsCurrentAnswers);
}

function qsRenderAll(score, answers){
    qsCurrentScore=score;
    qsCurrentAnswers=answers||[];
    var gap=Math.max(0,80-score),urgent=0;
    for(var i=0;i<qsSolutions.length;i++){if(score<qsSolutions[i].urgentBelow)urgent++;}
    var timeEst=score<50?'3-6 months':score<70?'1-3 months':score<80?'2-4 weeks':'Ongoing';
    document.getElementById('qsSub').textContent=score>=80?'You are above the Bhutan average of 80% — here are ways to keep strengthening and help your community.':'Your score is below the Bhutan average of 80% — these personalised solutions are based on your specific answers.';
    document.getElementById('qsSummary').innerHTML=
        '<div class="qs-sum-card"><div class="qs-sum-val">'+(gap>0?'+'+gap+'%':'Above avg')+'</div><div class="qs-sum-lbl">Points to average</div></div>'+
        '<div class="qs-sum-card"><div class="qs-sum-val">'+urgent+'</div><div class="qs-sum-lbl">Priority actions</div></div>'+
        '<div class="qs-sum-card"><div class="qs-sum-val">'+timeEst+'</div><div class="qs-sum-lbl">Est. time to improve</div></div>';
    qsRenderSolutions(score, qsCurrentAnswers);
    qsRenderRoadmap(score);
}

function qsRenderSolutions(score, answers){  //stores answer for the question. eg:2/10 and system marks priority and displays scam - awareness recommendation first 
    answers = answers || [];
    var filtered=[];
    for(var i=0;i<qsSolutions.length;i++){
        if(qsCurrentFilter==='all'||qsSolutions[i].category===qsCurrentFilter) filtered.push(qsSolutions[i]);
    }
    // Sort: most urgent first based on actual answer score
    filtered.sort(function(a,b){
        var aScore = answers[a.questionIndex] || 5;
        var bScore = answers[b.questionIndex] || 5;
        // Lower answer = higher priority
        return aScore - bScore;
    });

    var html='<div class="qs-sol-list">';
    if(filtered.length===0) html+='<div style="font-size:13px;color:var(--muted);padding:8px 0;">No solutions in this category.</div>';

    for(var i=0;i<filtered.length;i++){
        var s=filtered[i];
        var answerScore = answers[s.questionIndex] || 5;
        var isU = answerScore <= 3;
        var isM = answerScore > 3 && answerScore <= 6;

        var cls = isU?'qs-sol urgent':isM?'qs-sol medium':'qs-sol';
        var bCls = isU?'qs-badge urgent':isM?'qs-badge medium':'qs-badge good';
        var bTxt = isU?'🔴 Priority — Score '+answerScore+'/10':isM?'🟡 Recommended — Score '+answerScore+'/10':'🟢 Strengthen — Score '+answerScore+'/10';

        // Build personalised "because" sentence
        var becauseTxt = s.because.replace('{score}', answerScore);

        html += '<div class="'+cls+'">';
        html += '<div class="qs-sol-header"><div class="qs-sol-title">'+s.title+'</div><span class="'+bCls+'">'+bTxt+'</span></div>';

        // BECAUSE block — the key personalisation
        html += '<div style="background:#f0f6ff;border-left:3px solid #2a6aad;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:12px;font-size:12px;color:#1a4a7a;line-height:1.6;">';
        html += '<strong>Why this suggestion?</strong> '+becauseTxt;
        html += '</div>';

        html += '<div class="qs-sol-body">'+s.body+'</div>';
        html += '<div style="font-size:11px;font-weight:600;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">Your next steps:</div>';
        html += '<div class="qs-actions">';
        for(var j=0;j<s.actions.length;j++) html+='<div class="qs-action"><div class="qs-adot"></div><span>'+s.actions[j]+'</span></div>';
        html += '</div><div class="qs-tags">';
        for(var k=0;k<s.gnh.length;k++) html+='<span class="qs-tag">'+s.gnh[k]+'</span>';
        html += '<span class="qs-tag impact">'+s.impact+'</span></div></div>';
    }
    html+='</div>';
    document.getElementById('qsSolutions').innerHTML=html;
}

function qsRenderRoadmap(score){ //creates future growth plan .e.g year 1: 65%, year 2: 73%, year 3:86%, shows projected improvement 
    var y1=Math.min(100,score+8),y2=Math.min(100,y1+7),y3=Math.min(100,y2+6),y4=Math.min(100,y3+5);
    var steps=[{label:'Now',sc:score,focus:'Assess your gaps',detail:'Take the quiz, identify weak areas, make a personal improvement plan'},{label:'Year 1',sc:y1,focus:'Learn and protect',detail:'Complete crypto basics, learn scam awareness, improve internet access'},{label:'Year 2',sc:y2,focus:'Practice and build',detail:'Use a demo wallet regularly, follow regulations, join community discussions'},{label:'Year 3',sc:y3,focus:'Adopt carefully',detail:'Start small with regulated crypto products, help others in your community'},{label:'Year 4',sc:y4,focus:'Lead and grow',detail:'Share knowledge, mentor others, contribute to GNH-aligned adoption in Bhutan'}];
    var html='';
    for(var i=0;i<steps.length;i++){var st=steps[i];html+='<div class="qs-road-item"><div class="qs-year"><div class="qs-year-lbl">'+st.label+'</div><div class="qs-year-score">'+Math.round(st.sc)+'%</div></div><div class="qs-road-content" style="flex:1;"><p>'+st.focus+'</p><span>'+st.detail+'</span><div class="qs-road-bar-wrap"><div class="qs-road-bar" style="width:'+Math.round(st.sc)+'%"></div></div></div></div>';}
    document.getElementById('qsRoadmap').innerHTML=html;
}


// ═══════════════════════════════════════
// LOADING SCREEN
// ═══════════════════════════════════════
window.addEventListener('load', function() { //after page fully loads t
    setTimeout(function() {
        var ls = document.getElementById('loadingScreen');
        if (ls) {
            ls.style.opacity = '0';
            setTimeout(function() { ls.style.display = 'none'; }, 800); //removes splash screen 
        }
    }, 1800);
});

// ═══════════════════════════════════════
// HAMBURGER MENU
// ═══════════════════════════════════════
function toggleMenu() { // used for mobile navigation :contrils, open menu, close menu, show overlay, lock page scrolling 
    var nav     = document.getElementById('navLinks');
    var burger  = document.getElementById('hamburger');
    var overlay = document.getElementById('navOverlay');
    nav.classList.toggle('open');
    burger.classList.toggle('active');
    overlay.classList.toggle('show');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
    var nav     = document.getElementById('navLinks');
    var burger  = document.getElementById('hamburger');
    var overlay = document.getElementById('navOverlay');
    if (nav) nav.classList.remove('open');
    if (burger) burger.classList.remove('active');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
}

// ═══════════════════════════════════════
// SCROLL ANIMATIONS
// ═══════════════════════════════════════
var revealObserver = new IntersectionObserver(function(entries) { //when section enters screen, class is added. this trigers css animations.
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
    revealObserver.observe(el);
});

// ═══════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════
function animateCounter(el, target, suffix, duration) { //appearlt 113, 80%,96% instead of appearing 1,10,20,40,80
    var start = 0;
    var step  = target / (duration / 16);
    var timer = setInterval(function() {
        start += step;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        if (suffix === '%') el.textContent = Math.round(start) + '%';
        else if (suffix === '.75') el.textContent = Math.round(start) === target ? '12.75' : Math.round(start);
        else el.textContent = Math.round(start);
    }, 16);
}

var statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var items = entry.target.querySelectorAll('.stat-num');
            items.forEach(function(item) {
                var text = item.textContent.trim();
                if (text === '113')   animateCounter(item, 113, '', 1200);
                if (text === '80%')   animateCounter(item, 80, '%', 1200);
                if (text === '96%')   animateCounter(item, 96, '%', 1200);
                if (text === '12.75') animateCounter(item, 12.75, '.75', 1200);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

var statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);

// ═══════════════════════════════════════
// CURSOR GLOW
// ═══════════════════════════════════════
var cursorGlow = document.getElementById('cursorGlow'); //tracks mouse 
document.addEventListener('mousemove', function(e) {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top  = e.clientY + 'px';
    } // moves glow element and create futuristic effect 
});

// ═══════════════════════════════════════
// FLOATING QUIZ BUTTON
// ═══════════════════════════════════════
var floatBtn = document.getElementById('floatingQuizBtn');
window.addEventListener('scroll', function() {
    if (!floatBtn) return;
    if (window.scrollY > 400) { //if user reaches quiz section, buttin hides automatically 
        floatBtn.style.opacity  = '1';
        floatBtn.style.transform = 'translateY(0)';
    } else {
        floatBtn.style.opacity  = '0';
        floatBtn.style.transform = 'translateY(20px)';
    }
});

// Hide floating button when user is in quiz section
var quizSection = document.getElementById('quiz');
if (quizSection) {
    var quizObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (floatBtn) {
                floatBtn.style.opacity = entry.isIntersecting ? '0' : (window.scrollY > 400 ? '1' : '0');
            }
        });
    }, { threshold: 0.1 });
    quizObserver.observe(quizSection);
}


// ══════════════════════════════════════════
// DARK / LIGHT MODE
// ══════════════════════════════════════════
function toggleTheme() { //switches from dark to light 
    var body = document.body;
    var btn  = document.getElementById('themeToggle');
    body.classList.toggle('light-mode');
    var isLight = body.classList.contains('light-mode');
    if (btn) btn.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('drukshift-theme', isLight ? 'light' : 'dark');
}

// Remember theme on reload
window.addEventListener('DOMContentLoaded', function() {
    var saved = localStorage.getItem('drukshift-theme'); //stores oerferences so theme remains under refresh 
    var btn   = document.getElementById('themeToggle');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        if (btn) btn.textContent = '🌙';
    } else {
        if (btn) btn.textContent = '☀️';
    }
});

// ══════════════════════════════════════════
// LIVE QUIZ COUNTER
// ══════════════════════════════════════════
async function loadLiveCount() { //calss api/admin/results and displays as 127 people assesed or whatever the count exists
    try {
        var res  = await fetch('https://drukshift-vakend.onrender.com/api/admin/results');
        var data = await res.json();
        var count = (data.results || []).length;
        var el = document.getElementById('liveCountNum');
        if (el) {
            // Animate number counting up
            var start = 0;
            var timer = setInterval(function() {
                start += 1;
                el.textContent = start;
                if (start >= count) { el.textContent = count; clearInterval(timer); }
            }, 60);
        }
    } catch(e) {
        var el = document.getElementById('liveCountNum');
        if (el) el.textContent = '—';
    }
}
loadLiveCount();

// ══════════════════════════════════════════
// ANIMATED PROGRESS BARS IN FINDINGS
// ══════════════════════════════════════════
var findingsObserver = new IntersectionObserver(function(entries) { //bars animate to their target percentage 
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var bars = entry.target.querySelectorAll('.finding-stat-fill');
            bars.forEach(function(bar) {
                var target = bar.getAttribute('data-width');
                setTimeout(function() {
                    bar.style.width = target + '%';
                }, 200);
            });
            findingsObserver.disconnect();
        }
    });
}, { threshold: 0.2 });

var fg = document.getElementById('findingsGrid');
if (fg) findingsObserver.observe(fg);



// ════════════════════════════════════════
// MINI GAMES ENGINE — DIRECTLY EMBEDDED 
// ════════════════════════════════════════
var mgXP = parseInt(localStorage.getItem('mg-xp') || '0'); //stores experiencing points and local stroage, players can earn xp from games 
var mgCurrentGame = 'blitz'; //
var mgTimers = [];

function mgUpdateXP() {
    var pct = Math.min((mgXP / 500) * 100, 100);
    var fill = document.getElementById('mg-xp-fill');
    var num  = document.getElementById('mg-xp-num');
    if (fill) fill.style.width = pct + '%';
    if (num)  num.textContent = mgXP;
}

function mgAddXP(pts) {
    mgXP += pts;
    localStorage.setItem('mg-xp', mgXP);
    mgUpdateXP();
    if (typeof updateXP === 'function') updateXP(pts);
}

function mgShowMenu() {
    mgStopTimers();
    var menu = document.getElementById('mg-menu');
    var game = document.getElementById('mg-game');
    var res  = document.getElementById('mg-result');
    if (menu) menu.style.display = 'block';
    if (game) game.style.display = 'none';
    if (res)  res.style.display  = 'none';
    mgUpdateHS();
    mgUpdateLB();
}

function mgUpdateHS() {
    ['blitz','scam','memory'].forEach(function(g) {
        var el = document.getElementById('mg-hs-' + g);
        if (el) el.textContent = 'Best: ' + (localStorage.getItem('mg-hs-' + g) || '0');
    });
}

function mgUpdateLB() {
    var el = document.getElementById('mg-lb');
    if (!el) return;
    var medals = ['🥇','🥈','🥉'];
    var names  = {blitz:'Quiz Blitz', scam:'Scam Spotter', memory:'Match Term'};
    var html = '';
    ['blitz','scam','memory'].forEach(function(g, i) {
        var score = localStorage.getItem('mg-hs-' + g) || '0';
        html += '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">' +
            '<span style="font-size:18px;">' + medals[i] + '</span>' +
            '<span style="flex:1;font-size:13px;color:white;">' + names[g] + '</span>' +
            '<span style="font-size:13px;font-weight:700;color:#e9c46a;">' + score + '</span></div>';
    });
    el.innerHTML = html;
}

function mgStart(game) {
    mgCurrentGame = game;
    var menu = document.getElementById('mg-menu');
    var gameDiv = document.getElementById('mg-game');
    var res  = document.getElementById('mg-result');
    if (menu) menu.style.display = 'none';
    if (gameDiv) gameDiv.style.display = 'block';
    if (res)  res.style.display = 'none';
    var fb = document.getElementById('mg-feedback');
    if (fb) fb.style.display = 'none';
    var qcard = document.getElementById('mg-qcard');
    if (qcard) qcard.style.display = 'block';
    if (game === 'blitz')  mgInitBlitz();
    if (game === 'scam')   mgInitScam();
    if (game === 'memory') mgInitMemory();
}

function mgShowResult(score, max, xp) {
    mgStopTimers();
    var prev = parseInt(localStorage.getItem('mg-hs-' + mgCurrentGame) || '0');
    if (score > prev) localStorage.setItem('mg-hs-' + mgCurrentGame, score);
    var pct   = max > 0 ? Math.round((score / max) * 100) : 0;
    var emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🥇' : pct >= 40 ? '🥈' : '🥉';
    var label = pct >= 80 ? 'Outstanding! 🇧🇹' : pct >= 60 ? 'Great job!' : pct >= 40 ? 'Good effort!' : 'Keep practising!';
    var re = document.getElementById('mg-res-emoji');
    var rs = document.getElementById('mg-res-score');
    var rl = document.getElementById('mg-res-label');
    var rx = document.getElementById('mg-res-xp');
    var ra = document.getElementById('mg-res-again');
    if (re) re.textContent = emoji;
    if (rs) rs.textContent = score + '/' + max;
    if (rl) rl.textContent = label;
    if (rx) rx.textContent = '+' + xp + ' XP earned!';
    if (ra) ra.onclick = function() { mgStart(mgCurrentGame); };
    var gameDiv = document.getElementById('mg-game');
    var res     = document.getElementById('mg-result');
    if (gameDiv) gameDiv.style.display = 'none';
    if (res)     res.style.display     = 'block';
    mgAddXP(xp);
}

function mgStopTimers() {
    mgTimers.forEach(function(t) { clearInterval(t); clearTimeout(t); });
    mgTimers = [];
}

function mgShuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
}

function mgDots(answered, total, current) {
    var el = document.getElementById('mg-dots');
    if (!el) return;
    var html = '';
    for (var i = 0; i < total; i++) {
        var bg = i < answered.length
            ? (answered[i] ? '#2a9d8f' : '#e63946')
            : (i === current ? '#e9c46a' : 'rgba(255,255,255,0.2)');
        html += '<div style="width:10px;height:10px;border-radius:50%;background:' + bg + ';display:inline-block;margin:2px;"></div>';
    }
    el.innerHTML = html;
}

// ── BLITZ ── //true or false crypto quiz 
var mgBlitzQs = [
    {q:"Bitcoin was created in 2009.", a:true, f:"Satoshi Nakamoto released Bitcoin in January 2009."},
    {q:"Crypto transactions are 100% anonymous.", a:false, f:"They are pseudonymous — wallet addresses are public."},
    {q:"Bhutan mines Bitcoin using hydropower.", a:true, f:"Bhutan built one of Asia's largest Bitcoin mining operations."},
    {q:"Blockchain is controlled by one central bank.", a:false, f:"Blockchain is decentralised — no single entity controls it."},
    {q:"You can recover a wallet without the seed phrase.", a:false, f:"Without seed phrase, a lost wallet cannot be recovered."},
    {q:"80% of Bhutanese adults show crypto readiness.", a:true, f:"DrukShift found 80% overall readiness among 113 adults."},
    {q:"Nansen is partnering with Gelephu Mindfulness City.", a:true, f:"Nansen announced GMC Bhutan partnership in 2026."},
    {q:"Internet quality does NOT affect crypto safety.", a:false, f:"Poor internet is the #1 barrier to safe crypto in Bhutan."},
    {q:"The 25-34 age group scored highest in DrukShift.", a:true, f:"25-34 group averaged 13.74/16 — the highest score."},
    {q:"Confirmed crypto transactions can be reversed.", a:false, f:"Crypto transactions are irreversible once confirmed."},
    {q:"GNH stands for Gross National Happiness.", a:true, f:"Bhutan measures wellbeing through GNH across 9 domains."},
    {q:"A crypto wallet stores your actual coins.", a:false, f:"Wallets store private keys — coins live on the blockchain."}
];

var mgBState = {};
function mgInitBlitz() {
    var gt = document.getElementById('mg-game-title');
    var gs = document.getElementById('mg-game-sub');
    if (gt) gt.textContent = '⚡ Crypto Quiz Blitz';
    if (gs) gs.textContent = 'True or False · 30 seconds';
    mgBState = { qs: mgShuffle([].concat(mgBlitzQs)).slice(0,10), cur:0, score:0, answered:[], timeLeft:30, running:true };
    mgBlitzRender();
    mgBlitzTimer();
}

function mgBlitzRender() {
    if (mgBState.cur >= mgBState.qs.length) { mgShowResult(mgBState.score, mgBState.qs.length, mgBState.score * 5); return; }
    var q = mgBState.qs[mgBState.cur];
    var qn = document.getElementById('mg-qnum');
    var qt = document.getElementById('mg-qtext');
    var ss = document.getElementById('mg-stat-score');
    var sq = document.getElementById('mg-stat-q');
    var fb = document.getElementById('mg-feedback');
    if (qn) qn.textContent = 'Question ' + (mgBState.cur + 1);
    if (qt) qt.textContent = q.q;
    if (ss) ss.textContent = mgBState.score;
    if (sq) sq.textContent = mgBState.cur + 1;
    if (fb) fb.style.display = 'none';
    mgDots(mgBState.answered, 10, mgBState.cur);
    var ans = document.getElementById('mg-answers');
    if (ans) ans.innerHTML =
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">' +
        '<button id="mg-true-btn" style="padding:20px;border-radius:12px;border:2px solid rgba(42,157,143,0.5);background:rgba(42,157,143,0.08);color:white;font-size:18px;font-weight:700;font-family:Outfit,sans-serif;cursor:pointer;">✅ TRUE</button>' +
        '<button id="mg-false-btn" style="padding:20px;border-radius:12px;border:2px solid rgba(230,57,70,0.5);background:rgba(230,57,70,0.08);color:white;font-size:18px;font-weight:700;font-family:Outfit,sans-serif;cursor:pointer;">❌ FALSE</button>' +
        '</div>';
    setTimeout(function() {
        var tb = document.getElementById('mg-true-btn');
        var fb2 = document.getElementById('mg-false-btn');
        if (tb) tb.addEventListener('click', function() { mgBlitzAns(true); });
        if (fb2) fb2.addEventListener('click', function() { mgBlitzAns(false); });
    }, 50);
}

function mgBlitzAns(ans) {
    if (!mgBState.running) return;
    var q = mgBState.qs[mgBState.cur];
    var correct = ans === q.a;
    if (correct) mgBState.score++;
    mgBState.answered.push(correct);
    var fb = document.getElementById('mg-feedback');
    if (fb) {
        fb.style.cssText = 'display:block;padding:14px;border-radius:10px;margin-bottom:16px;font-size:13px;line-height:1.6;' +
            (correct ? 'background:rgba(42,157,143,0.15);border:1px solid #2a9d8f;color:#2a9d8f;' : 'background:rgba(230,57,70,0.15);border:1px solid #e63946;color:#ff8a8a;');
        fb.textContent = (correct ? '✅ Correct! ' : '❌ Wrong. ') + q.f;
    }
    var ans2 = document.getElementById('mg-answers');
    if (ans2) ans2.innerHTML = '';
    mgBState.cur++;
    var t = setTimeout(mgBlitzRender, 1200);
    mgTimers.push(t);
}

function mgBlitzTimer() {
    mgBState.timeLeft = 30;
    var t = setInterval(function() {
        if (!mgBState.running) { clearInterval(t); return; }
        mgBState.timeLeft--;
        var st = document.getElementById('mg-stat-time');
        var tb = document.getElementById('mg-timer-bar');
        if (st) st.textContent = mgBState.timeLeft;
        if (tb) tb.style.width = (mgBState.timeLeft / 30 * 100) + '%';
        if (mgBState.timeLeft <= 0) {
            clearInterval(t);
            mgBState.running = false;
            mgShowResult(mgBState.score, mgBState.qs.length, mgBState.score * 5);
        }
    }, 1000);
    mgTimers.push(t);
}

// ── SCAM SPOTTER ──
var mgScamMsgs = [ 
    {sender:'CryptoKing2026', avatar:'👑', text:'🚀 URGENT! Send 0.01 BTC now and receive 0.1 BTC back in 24 hours! 500% guaranteed returns!', isScam:true, reason:'Guaranteed returns are the #1 sign of a crypto scam.'},
    {sender:'RMA Bhutan Official', avatar:'🏛️', text:'Cryptocurrency transactions above Nu.50,000 must be reported to the Royal Monetary Authority. Visit rma.org.bt.', isScam:false, reason:'Legitimate regulatory communication from an official government body.'},
    {sender:'Binance Support', avatar:'💬', text:'Your account is locked! Click binance-secure-verify.xyz and enter your seed phrase to restore access.', isScam:true, reason:'Never share your seed phrase. Official exchanges never ask for it.'},
    {sender:'Elon_Musk_Official', avatar:'🚀', text:'I am giving away 5,000 Bitcoin! Send 0.1 BTC to this address and I will send back 1 BTC!', isScam:true, reason:'Celebrity giveaway scams are very common. Never send crypto to receive more.'},
    {sender:'DrukShift', avatar:'🇧🇹', text:'Your readiness quiz result is ready! You scored 78% — Crypto Ready 🥇. Visit kinzang7066.github.io.', isScam:false, reason:'Legitimate DrukShift notification with a real GitHub Pages link.'},
    {sender:'CryptoPro_BT', avatar:'💰', text:'I can triple your investment in 7 days. Minimum deposit Nu.10,000. WhatsApp me now!', isScam:true, reason:'Promises of tripling money quickly are classic investment scams.'},
    {sender:'Bank of Bhutan', avatar:'🏦', text:'BOB Digital Lending: Your loan application has been approved. Log in to bobloan.bt.', isScam:false, reason:'Real loan system with a legitimate .bt domain.'},
    {sender:'MetaMask Security', avatar:'🦊', text:'ALERT: Enter your 12-word recovery phrase at metamask-security-check.com to secure your funds.', isScam:true, reason:'MetaMask will NEVER ask for your recovery phrase. This is phishing.'}
];

var mgSState = {};
var mgSTimerInt = null;

function mgInitScam() { //educational cybersecurity game users identifies Legit or Scam 
    var gt = document.getElementById('mg-game-title');
    var gs = document.getElementById('mg-game-sub');
    if (gt) gt.textContent = '🎯 Scam Spotter';
    if (gs) gs.textContent = 'Scam or Legit? · 10 seconds each';
    mgSState = { msgs: mgShuffle([].concat(mgScamMsgs)), cur:0, score:0, answered:[], timeLeft:10, running:true };
    mgScamRender();
    mgScamStartTimer();
}

function mgScamRender() {
    if (mgSState.cur >= mgSState.msgs.length) { mgShowResult(mgSState.score, mgSState.msgs.length, Math.round(mgSState.score * 7.5)); return; }
    var m = mgSState.msgs[mgSState.cur];
    var qn = document.getElementById('mg-qnum');
    var qt = document.getElementById('mg-qtext');
    var ss = document.getElementById('mg-stat-score');
    var sq = document.getElementById('mg-stat-q');
    var fb = document.getElementById('mg-feedback');
    if (qn) qn.textContent = m.avatar + ' ' + m.sender;
    if (qt) qt.textContent = m.text;
    if (ss) ss.textContent = mgSState.score;
    if (sq) sq.textContent = (mgSState.cur + 1) + '/' + mgSState.msgs.length;
    if (fb) fb.style.display = 'none';
    mgDots(mgSState.answered, mgSState.msgs.length, mgSState.cur);
    mgSState.timeLeft = 10;
    var ans = document.getElementById('mg-answers');
    if (ans) ans.innerHTML =
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">' +
        '<button id="mg-legit-btn" style="padding:16px;border-radius:12px;border:2px solid rgba(42,157,143,0.5);background:rgba(42,157,143,0.08);color:white;font-size:14px;font-weight:700;font-family:Outfit,sans-serif;cursor:pointer;">✅ LEGIT</button>' +
        '<button id="mg-scam-btn" style="padding:16px;border-radius:12px;border:2px solid rgba(230,57,70,0.5);background:rgba(230,57,70,0.08);color:white;font-size:14px;font-weight:700;font-family:Outfit,sans-serif;cursor:pointer;">🚨 SCAM!</button>' +
        '</div>';
    setTimeout(function() {
        var lb = document.getElementById('mg-legit-btn');
        var sb = document.getElementById('mg-scam-btn');
        if (lb) lb.addEventListener('click', function() { mgScamAns('legit'); });
        if (sb) sb.addEventListener('click', function() { mgScamAns('scam'); });
    }, 50);
}

function mgScamAns(ans) {
    if (mgSTimerInt) { clearInterval(mgSTimerInt); mgSTimerInt = null; }
    var m = mgSState.msgs[mgSState.cur];
    var correct = (ans === 'scam') === m.isScam;
    if (correct) mgSState.score++;
    mgSState.answered.push(correct);
    var fb = document.getElementById('mg-feedback');
    if (fb) {
        fb.style.cssText = 'display:block;padding:14px;border-radius:10px;margin-bottom:16px;font-size:13px;line-height:1.6;' +
            (correct ? 'background:rgba(42,157,143,0.15);border:1px solid #2a9d8f;color:#2a9d8f;' : 'background:rgba(230,57,70,0.15);border:1px solid #e63946;color:#ff8a8a;');
        fb.textContent = (correct ? '✅ Correct! ' : '❌ Wrong! ') + m.reason;
    }
    var ans2 = document.getElementById('mg-answers');
    if (ans2) ans2.innerHTML = '';
    mgSState.cur++;
    var t = setTimeout(function() {
        mgScamRender();
        if (mgSState.cur < mgSState.msgs.length) mgScamStartTimer();
    }, 2000);
    mgTimers.push(t);
}

function mgScamStartTimer() {
    if (mgSTimerInt) clearInterval(mgSTimerInt);
    mgSTimerInt = setInterval(function() {
        mgSState.timeLeft--;
        var st = document.getElementById('mg-stat-time');
        var tb = document.getElementById('mg-timer-bar');
        if (st) st.textContent = mgSState.timeLeft;
        if (tb) tb.style.width = (mgSState.timeLeft / 10 * 100) + '%';
        if (mgSState.timeLeft <= 0) {
            clearInterval(mgSTimerInt);
            mgSState.answered.push(false);
            var fb = document.getElementById('mg-feedback');
            if (fb) {
                fb.style.cssText = 'display:block;padding:14px;border-radius:10px;margin-bottom:16px;font-size:13px;line-height:1.6;background:rgba(230,57,70,0.15);border:1px solid #e63946;color:#ff8a8a;';
                fb.textContent = '⏰ Time up! ' + mgSState.msgs[mgSState.cur].reason;
            }
            var ans2 = document.getElementById('mg-answers');
            if (ans2) ans2.innerHTML = '';
            mgSState.cur++;
            var t = setTimeout(function() {
                mgScamRender();
                if (mgSState.cur < mgSState.msgs.length) mgScamStartTimer();
            }, 2000);
            mgTimers.push(t);
        }
    }, 1000);
    mgTimers.push(mgSTimerInt);
}

// ── MEMORY MATCH ──
var mgMemPairs = [
    {term:'Bitcoin', def:'First crypto, created 2009'},
    {term:'Blockchain', def:'Decentralised digital ledger'},
    {term:'Seed Phrase', def:'12 words to recover wallet'},
    {term:'Mining', def:'Creating coins by solving puzzles'},
    {term:'DeFi', def:'Decentralised finance services'},
    {term:'GNH', def:'Gross National Happiness'},
    {term:'Wallet', def:'Stores your private keys'},
    {term:'NFT', def:'Unique digital ownership token'}
];
var mgMState = {};
var mgMTimerInt = null;

function mgInitMemory() { //memory card matching game eg: bitcoin - firsr crypti in 2009
    var gt = document.getElementById('mg-game-title');
    var gs = document.getElementById('mg-game-sub');
    var st = document.getElementById('mg-stat-time');
    var qc = document.getElementById('mg-qcard');
    if (gt) gt.textContent = '🃏 Match the Term';
    if (gs) gs.textContent = 'Tap two cards to match term + definition';
    if (st) st.textContent = '0';
    if (qc) qc.style.display = 'none';
    document.getElementById('mg-dots').innerHTML = '';
    var pairs = mgShuffle([].concat(mgMemPairs)).slice(0,6);
    var cards = [];
    pairs.forEach(function(p,i){
        cards.push({type:'term', text:p.term, pairId:i});
        cards.push({type:'def',  text:p.def,  pairId:i});
    });
    mgMState = { cards:mgShuffle(cards), flipped:[], matched:[], moves:0, time:0, canFlip:true, running:true };
    mgMemRender();
    if (mgMTimerInt) clearInterval(mgMTimerInt);
    mgMTimerInt = setInterval(function(){
        if (!mgMState.running) return;
        mgMState.time++;
        var st2 = document.getElementById('mg-stat-time');
        if (st2) st2.textContent = mgMState.time;
    },1000);
    mgTimers.push(mgMTimerInt);
}

function mgMemRender() {
    var ss = document.getElementById('mg-stat-score');
    var sq = document.getElementById('mg-stat-q');
    if (ss) ss.textContent = mgMState.matched.length;
    if (sq) sq.textContent = mgMState.moves;
    var html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px;">';
    mgMState.cards.forEach(function(card,idx){
        var isFlipped  = mgMState.flipped.indexOf(idx) !== -1;
        var isMatched  = mgMState.matched.indexOf(card.pairId) !== -1;
        var bg     = isMatched ? 'rgba(42,157,143,0.3)' : isFlipped ? 'rgba(42,157,143,0.15)' : 'rgba(255,255,255,0.05)';
        var border = isMatched ? '#2a9d8f' : isFlipped ? '#2a9d8f' : 'rgba(255,255,255,0.1)';
        var show   = isFlipped || isMatched;
        var cursor = isMatched ? 'default' : 'pointer';
        html += '<div data-memidx="' + idx + '" style="aspect-ratio:1;border-radius:8px;border:2px solid '+border+';background:'+bg+';cursor:'+cursor+';display:flex;align-items:center;justify-content:center;font-size:10px;text-align:center;padding:4px;color:white;font-weight:600;line-height:1.3;">' +
            (show ? '<span style="font-size:10px;">'+card.text+'</span>' : '<span style="font-size:18px;">'+(card.type==='term'?'📖':'💡')+'</span>') +
            '</div>';
    });
    html += '</div><div style="text-align:center;font-size:11px;color:#7a9bb5;">Matches: '+mgMState.matched.length+'/6 · Moves: '+mgMState.moves+'</div>';
    var ans = document.getElementById('mg-answers');
    if (ans) {
        ans.innerHTML = html;
        ans.querySelectorAll('[data-memidx]').forEach(function(el) {
            el.addEventListener('click', function() { mgMemFlip(parseInt(this.getAttribute('data-memidx'))); });
        });
    }
}

function mgMemFlip(idx) {
    if (!mgMState.canFlip || !mgMState.running) return;
    if (mgMState.flipped.indexOf(idx) !== -1) return;
    if (mgMState.matched.indexOf(mgMState.cards[idx].pairId) !== -1) return;
    if (mgMState.flipped.length >= 2) return;
    mgMState.flipped.push(idx);
    mgMemRender();
    if (mgMState.flipped.length === 2) {
        mgMState.moves++;
        mgMState.canFlip = false;
        var c1 = mgMState.cards[mgMState.flipped[0]];
        var c2 = mgMState.cards[mgMState.flipped[1]];
        if (c1.pairId === c2.pairId && c1.type !== c2.type) {
            var t = setTimeout(function(){
                mgMState.matched.push(c1.pairId);
                mgMState.flipped = [];
                mgMState.canFlip = true;
                mgMemRender();
                if (mgMState.matched.length === 6) {
                    mgMState.running = false;
                    mgShowResult(6, 6, Math.max(10, 40 - mgMState.moves));
                }
            }, 500);
            mgTimers.push(t);
        } else {
            var t2 = setTimeout(function(){
                mgMState.flipped = [];
                mgMState.canFlip = true;
                mgMemRender();
            }, 800);
            mgTimers.push(t2);
        }
    }
}

// ── ATTACH GAME CARD CLICKS AFTER PAGE LOADS ──
window.addEventListener('load', function() {
    mgUpdateXP(); //displays highest score
    mgUpdateLB();
    mgUpdateHS();
    var cards = {
        'mg-card-blitz':  'blitz',
        'mg-card-scam':   'scam',
        'mg-card-memory': 'memory'
    };
    Object.keys(cards).forEach(function(id) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function() {
                mgStart(cards[id]);
            });
        }
    });
});


// ── BREADCRUMB ──
var bcSections = ['home','about','stats','story','gnh','solutions','readiness','findings','reports','quiz','resources'];
var bcLabels   = {home:'Home',about:'About',stats:'About',story:'About',gnh:'GNH Story',solutions:'Solutions',readiness:'Readiness',findings:'Findings',reports:'Reports',quiz:'Quiz',resources:'Resources'};

function bcGo(id){
    var el = document.getElementById(id);
    if(el){
        var offset = 64 + 36;
        var top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({top:top, behavior:'smooth'});
    }
}

function bcUpdate(){
    var scrollY = window.scrollY + 120;
    var current = 'home';
    bcSections.forEach(function(id){
        var el = document.getElementById(id);
        if(el && el.offsetTop <= scrollY) current = id;
    });
    document.querySelectorAll('.bc-link').forEach(function(btn){
        btn.classList.remove('active');
    });
    var label = bcLabels[current] || current;
    document.querySelectorAll('.bc-link').forEach(function(btn){
        if(btn.textContent.trim().replace('🏠 ','') === label || btn.textContent.trim() === label){
            btn.classList.add('active');
        }
    });
    // hide breadcrumb at very top
    var bc = document.getElementById('breadcrumb');
    if(bc){
        if(window.scrollY < 80){bc.classList.add('hidden');}
        else{bc.classList.remove('hidden');}
    }
}

window.addEventListener('scroll', bcUpdate, {passive:true});
window.addEventListener('load', function(){
    bcUpdate();
    document.getElementById('breadcrumb').classList.add('hidden');
});


// ── WELCOME POPUP ──
function closeWelcome() { //shows introductory overlay 
  var overlay = document.getElementById('welcomeOverlay');
  if(overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    setTimeout(function(){ overlay.style.display = 'none'; }, 300);
    localStorage.setItem('drukshift-visited', '1');
  } //shows introductory overlay so user only sees it once 
}
function startHere(section) {
  closeWelcome();
  setTimeout(function(){
    if(false) {
    } else {
      var el = document.getElementById(section);
      if(el) {
        var top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    }
  }, 350);
}
// Only show once per session — not every visit
window.addEventListener('DOMContentLoaded', function(){
  var visited = localStorage.getItem('drukshift-visited');
  if(visited) {
    var overlay = document.getElementById('welcomeOverlay');
    if(overlay) overlay.style.display = 'none';
  }
});

// ── PROBLEMS SECTION CAROUSEL ──
var psCur = 0, psTotal = 4, psTimer = null;
function psSlide(dir) {
  psCur = (psCur + dir + psTotal) % psTotal;
  psGoTo(psCur);
}
function psGoTo(n) { //controls the sliding cards in your "problems" section . Features : next slide, previous slude, autoplay every 3.5 seconds and pause on hover 
  psCur = n;
  var car = document.getElementById('psCarousel');
  if(car) car.style.transform = 'translateX(-' + (n * 100) + '%)';
  var dots = document.querySelectorAll('#psDots div');
  dots.forEach(function(d, i) {
    d.style.width = i === n ? '20px' : '8px';
    d.style.background = i === n ? 'var(--accent)' : 'rgba(255,255,255,0.3)';
  });
  var num = document.getElementById('psNum');
  if(num) num.textContent = n + 1;
}
// Auto play
psTimer = setInterval(function(){ psSlide(1); }, 3500);
// Pause on hover
var psEl = document.getElementById('psCarousel');
if(psEl) {
  psEl.addEventListener('mouseenter', function(){ clearInterval(psTimer); });
  psEl.addEventListener('mouseleave', function(){ psTimer = setInterval(function(){ psSlide(1); }, 3500); });
}