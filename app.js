const scenarios = {
  calibrated: {
    label: "Calibrated pilot",
    agreement: "86%",
    burden: "Low",
    decision: "Pilot-ready",
    brief: "The rubric separates observable behavior from preference, edge cases are represented, and disagreement routes to explicit adjudication.",
    consensus: [88,84,90,82,86],
    fills: [[82,88,84,90],[70,76,74,72],[88,84,90,86],[76,82,80,78],[92,88,90,86]],
    colors: ["#357BFF","#1E8E68","#357BFF","#7868E6","#1E8E68"]
  },
  vague: {
    label: "Vague rubric",
    agreement: "49%",
    burden: "High",
    decision: "Redesign",
    brief: "Terms such as 'helpful' and 'high quality' are not operationalized. Reviewer confidence looks high, but judgments diverge on the same evidence.",
    consensus: [45,52,38,57,51],
    fills: [[90,42,65,25],[38,85,50,72],[76,22,88,44],[20,74,48,92],[60,35,82,28]],
    colors: ["#F06F4F","#F06F4F","#F06F4F","#B87500","#F06F4F"]
  },
  edge: {
    label: "Missing edge case",
    agreement: "73%",
    burden: "Medium",
    decision: "Narrow scope",
    brief: "Average agreement hides a blind spot. The coverage map has no representative cases for a high-consequence exception, so acceptance criteria are not yet defensible.",
    consensus: [80,78,26,82,72],
    fills: [[76,80,78,82],[68,72,70,75],[92,18,66,32],[80,84,82,78],[70,76,72,74]],
    colors: ["#357BFF","#357BFF","#F06F4F","#357BFF","#B87500"]
  },
  consensus: {
    label: "False consensus",
    agreement: "94%",
    burden: "Hidden",
    decision: "Stress-test",
    brief: "Reviewers agree because the sample is easy and the rubric rewards surface similarity. High inter-rater agreement is not evidence of decision usefulness.",
    consensus: [94,95,96,92,93],
    fills: [[88,90,89,91],[84,86,85,87],[90,92,91,93],[82,84,83,85],[86,88,87,89]],
    colors: ["#B87500","#B87500","#B87500","#B87500","#B87500"]
  }
};

function setScenario(key){
  const s=scenarios[key];
  if(!s) return;
  document.querySelectorAll('[data-scenario]').forEach(btn=>btn.setAttribute('aria-pressed', String(btn.dataset.scenario===key)));
  document.querySelectorAll('.review-row').forEach((row,i)=>{
    row.style.setProperty('--consensus',s.consensus[i]+'%');
    row.style.setProperty('--state-color',s.colors[i]);
    row.querySelectorAll('.judge').forEach((cell,j)=>{
      cell.style.setProperty('--fill',s.fills[i][j]+'%');
      cell.style.setProperty('--state-color',s.colors[i]);
      cell.querySelector('span').textContent=s.fills[i][j]>=75?'A':s.fills[i][j]>=50?'B':'C';
    });
  });
  document.querySelector('[data-readout="agreement"]').textContent=s.agreement;
  document.querySelector('[data-readout="burden"]').textContent=s.burden;
  document.querySelector('[data-readout="decision"]').textContent=s.decision;
  document.querySelector('[data-readout="brief"]').textContent=s.brief;
  document.querySelector('.convergence-panel').dataset.state=key;
}

document.querySelectorAll('[data-scenario]').forEach(btn=>btn.addEventListener('click',()=>setScenario(btn.dataset.scenario)));
setScenario('calibrated');
