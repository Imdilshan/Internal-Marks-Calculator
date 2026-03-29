(function () {

   const tabHybrid = document.getElementById('tab-hybrid');
   const tabTheory = document.getElementById('tab-theory');
   const tabPractical = document.getElementById('tab-practical');
   const panelHybrid = document.getElementById('panel-hybrid');
   const panelTheory = document.getElementById('panel-theory');
   const panelPractical = document.getElementById('panel-practical');

   function showTab(tab) {
      tabHybrid.classList.remove('active');
      tabTheory.classList.remove('active');
      tabPractical.classList.remove('active');
      panelHybrid.style.display = 'none';
      panelTheory.style.display = 'none';
      panelPractical.style.display = 'none';
      tab.classList.add('active');
      if (tab === tabHybrid) panelHybrid.style.display = '';
      if (tab === tabTheory) panelTheory.style.display = '';
      if (tab === tabPractical) panelPractical.style.display = '';
   }
   if (tabHybrid && tabTheory && tabPractical) {
      tabHybrid.addEventListener('click', () => showTab(tabHybrid));
      tabTheory.addEventListener('click', () => showTab(tabTheory));
      tabPractical.addEventListener('click', () => showTab(tabPractical));
   }

   function getRawValue(id) {
      const el = document.getElementById(id);
      if (!el) return {
         provided: false,
         value: 0
      };
      if (el.value === '' || el.value === null) return {
         provided: false,
         value: 0
      };
      const n = Number(el.value);
      return {
         provided: !Number.isNaN(n),
         value: n
      };
   }

   function getNum(id, max) {
      const r = getRawValue(id);
      if (!r.provided) return 0;
      let n = r.value;
      if (Number.isNaN(n)) return 0;
      if (typeof max === 'number') {
         if (n < 0) n = 0;
         if (n > max) n = max;
      }
      return n;
   }

   function setText(id, txt) {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
   }

   function show(id) {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
   }

   function hide(id) {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
   }

   const numberInputs = Array.from(document.querySelectorAll('input[type=number]'));
   numberInputs.forEach(inp => {
      inp.addEventListener('input', (e) => {
         const oldPos = inp.selectionStart;
         const oldVal = inp.value;
         let cleaned = oldVal.replace(/[eE+\-]/g, '');
         const parts = cleaned.split('.');
         if (parts.length > 2) cleaned = parts[0] + '.' + parts.slice(1).join('');
         if (cleaned !== oldVal) {
            const diff = oldVal.length - cleaned.length;
            inp.value = cleaned;
            const newPos = Math.max(oldPos - diff, 0);
            try {
               inp.setSelectionRange(newPos, newPos);
            } catch (e) {}
         }
         validateField(inp.id);
      });
      inp.addEventListener('keydown', (ev) => {
         const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
         if (allowed.includes(ev.key)) return;
         if ((ev.key >= '0' && ev.key <= '9') || ev.key === '.') return;
         ev.preventDefault();
      });
   });

   function validateField(id) {
      const el = document.getElementById(id);
      const err = document.getElementById('err-' + id);
      if (!el || !err) return true;
      const min = el.hasAttribute('min') ? Number(el.getAttribute('min')) : null;
      const max = el.hasAttribute('max') ? Number(el.getAttribute('max')) : null;
      if (el.value === '') {
         el.classList.remove('invalid');
         err.classList.remove('show');
         return true;
      }
      const n = Number(el.value);
      if (Number.isNaN(n)) {
         el.classList.add('invalid');
         err.textContent = 'Enter a valid number';
         err.classList.add('show');
         return false;
      }
      if (min !== null && n < min) {
         el.classList.add('invalid');
         err.textContent = `Value must be ≥ ${min}`;
         err.classList.add('show');
         return false;
      }
      if (max !== null && n > max) {
         el.classList.add('invalid');
         err.textContent = `Value must be ≤ ${max}`;
         err.classList.add('show');
         return false;
      }
      el.classList.remove('invalid');
      err.classList.remove('show');
      return true;
   }

   function validateAll() {
      return Array.from(numberInputs).map(i => validateField(i.id)).every(x => x);
   }

   function calcHybrid() {
      try {
         if (!validateAll()) {
            alert('Fix input errors (highlighted in red) before calculating');
            return;
         }

         const assignment = getNum('hy_assignment', 10);
         const mst1 = getNum('hy_mst1', 20);
         const mst2 = getNum('hy_mst2', 20);
         const surprise = getNum('hy_surprise', 12);
         const quiz = getNum('hy_quiz', 4);
         const attendance = getNum('hy_attendance', 2);
         const classPerfOrig = getNum('hy_classperf', 10);

         const rawEnd = document.getElementById('hy_endwritten');
         let endWrittenProvided = false,
            endWrittenRaw = 0;
         if (rawEnd && rawEnd.value !== '') {
            endWrittenProvided = true;
            endWrittenRaw = Number(rawEnd.value);
         }

         const ws1 = getNum('hy_ws1', 30),
            ws2 = getNum('hy_ws2', 30),
            ws3 = getNum('hy_ws3', 30),
            ws4 = getNum('hy_ws4', 30);
         const miniproject = getNum('hy_miniproject', 5),
            industry = getNum('hy_industry', 10);

         const endPracticalEl = document.getElementById('hy_endpractical');
         let endPracticalProvided = false,
            endPractical = 0;
         if (endPracticalEl && endPracticalEl.value !== '') {
            endPracticalProvided = true;
            endPractical = Number(endPracticalEl.value);
         }

         const mst1_w = (mst1 / 20) * 5;
         const mst2_w = (mst2 / 20) * 5;
         const classPerf_w = (classPerfOrig / 10) * 5;
         const assignment_w = (assignment / 10) * 2;
         const quiz_w = (quiz / 4) * 2;
         const surprise_w = (surprise / 12) * 2;
         const attendance_w = (attendance / 2) * 2;
         const endWritten_w = endWrittenProvided ? (endWrittenRaw / 60) * 30 : 0;

         const theoryTotal = mst1_w + mst2_w + classPerf_w + assignment_w + quiz_w + surprise_w + attendance_w + endWritten_w;
         const theoryMax = endWrittenProvided ? 53 : 23;
         const theoryPct = (theoryTotal / theoryMax) * 100;

         const exp1_w = (ws1 / 30) * 5;
         const exp2_w = (ws2 / 30) * 5;
         const exp3_w = (ws3 / 30) * 5;
         const exp4_w = (ws4 / 30) * 5;
         const miniproject_w = (miniproject / 5) * 2;
         const industry_w = (industry / 10) * 5;
         const endPractical_w = endPracticalProvided ? (endPractical / 40) * 20 : 0;

         const practicalTotal = exp1_w + exp2_w + exp3_w + exp4_w + miniproject_w + industry_w + endPractical_w;
         const practicalMax = endPracticalProvided ? 47 : 27;
         const practicalPct = (practicalTotal / practicalMax) * 100;

         const totalObtained = theoryTotal + practicalTotal;
         const totalMax = theoryMax + practicalMax;
         const totalPct = (totalObtained / totalMax) * 100;

         setText('hy_theory_pct', `${theoryTotal.toFixed(2)} / ${theoryMax} (${theoryPct.toFixed(2)}%)`);
         setText('hy_practical_pct', `${practicalTotal.toFixed(2)} / ${practicalMax} (${practicalPct.toFixed(2)}%)`);
         setText('hy_combined_obt', `${totalObtained.toFixed(2)} / ${totalMax}`);
         setText('hy_combined_pct', totalPct.toFixed(2) + '%');

         const bar = document.getElementById('hy_bar');
         if (bar) bar.style.width = Math.min(100, totalPct) + '%';

         show('result-hybrid');


         const resEl = document.getElementById('result-hybrid');
         if (resEl) resEl.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
         });
      } catch (err) {
         console.error(err);
         alert('Calculation failed — open console for details');
      }
   }
   document.getElementById('calc-hybrid').addEventListener('click', calcHybrid);
   document.getElementById('reset-hybrid').addEventListener('click', () => {
      ['hy_assignment', 'hy_mst1', 'hy_mst2', 'hy_surprise', 'hy_quiz', 'hy_pbl', 'hy_attendance', 'hy_endwritten', 'hy_ws1', 'hy_ws2', 'hy_ws3', 'hy_ws4', 'hy_classperf', 'hy_miniproject', 'hy_industry', 'hy_endpractical'].forEach(id => {
         const el = document.getElementById(id);
         if (el) el.value = '';
         const err = document.getElementById('err-' + id);
         if (err) err.classList.remove('show');
         if (el) el.classList.remove('invalid');
      });
      hide('result-hybrid');
   });

   function calcTheory() {
      if (!validateAll()) {
         alert('Fix input errors (highlighted in red) before calculating');
         return;
      }

      const a = getNum('t_assignment', 10);
      const m1 = getNum('t_mst1', 20);
      const m2 = getNum('t_mst2', 20);
      const surprise = getNum('t_surprise', 12);
      const quiz = getNum('t_quiz', 4);
      const at = getNum('t_attendance', 2);

      const tEndEl = document.getElementById('t_endwritten');
      let tEndProvided = false,
         tEndRaw = 0;
      if (tEndEl && tEndEl.value !== '') {
         tEndProvided = true;
         tEndRaw = Number(tEndEl.value);
      }

      const mst1_w = (m1 / 20) * 10;
      const mst2_w = (m2 / 20) * 10;
      const assignment_w = (a / 10) * 10;
      const quiz_w = (quiz / 4) * 4;
      const surprise_w = (surprise / 12) * 4;
      const attendance_w = (at / 2) * 2;
      const endWritten_w = tEndProvided ? (tEndRaw / 60) * 60 : 0;

      const obtained = mst1_w + mst2_w + assignment_w + quiz_w + surprise_w + attendance_w + endWritten_w;
      const totalMax = tEndProvided ? 100 : 40;
      const pct = (obtained / totalMax) * 100;

      setText('t_obt', `${obtained.toFixed(2)} / ${totalMax}`);
      setText('t_max', totalMax.toFixed(0));
      setText('t_pct', pct.toFixed(2) + '%');

      const tbar = document.getElementById('t_bar');
      if (tbar) tbar.style.width = Math.min(100, pct) + '%';
      show('result-theory');
      const resT = document.getElementById('result-theory');
   }
   document.getElementById('calc-theory').addEventListener('click', calcTheory);
   document.getElementById('reset-theory').addEventListener('click', () => {
      ['t_assignment', 't_mst1', 't_mst2', 't_surprise', 't_quiz', 't_attendance', 't_endwritten'].forEach(id => {
         const el = document.getElementById(id);
         if (el) el.value = '';
         const err = document.getElementById('err-' + id);
         if (err) err.classList.remove('show');
         if (el) el.classList.remove('invalid');
      });
      hide('result-theory');
   });

   function calcPractical() {
      if (!validateAll()) {
         alert('Fix input errors (highlighted in red) before calculating');
         return;
      }

      const ws1 = getNum('pr_ws1', 30);
      const ws2 = getNum('pr_ws2', 30);
      const ws3 = getNum('pr_ws3', 30);
      const ws4 = getNum('pr_ws4', 30);
      const classPerf = getNum('pr_classperf', 10);
      const mini = getNum('pr_miniproject', 5);
      const industry = getNum('pr_industry', 10);

      const endEl = document.getElementById('pr_endpractical');
      let endProvided = false,
         endRaw = 0;
      if (endEl && endEl.value !== '') {
         endProvided = true;
         endRaw = Number(endEl.value);
      }

      const exp1_w = (ws1 / 30) * 10;
      const exp2_w = (ws2 / 30) * 10;
      const exp3_w = (ws3 / 30) * 10;
      const exp4_w = (ws4 / 30) * 10;

      const classPerf_w = (classPerf / 10) * 5;
      const mini_w = (mini / 5) * 5;
      const industry_w = (industry / 10) * 10;
      const endPractical_w = endProvided ? (endRaw / 40) * 40 : 0;

      const prTotal = exp1_w + exp2_w + exp3_w + exp4_w + classPerf_w + mini_w + industry_w + endPractical_w;
      const prMax = endProvided ? 100 : 60;
      const prPct = (prTotal / prMax) * 100;

      setText('pr_obt', `${prTotal.toFixed(2)}`);
      setText('pr_max', `${prMax}`);
      setText('pr_pct', `${prPct.toFixed(2)}%`);

      const prbar = document.getElementById('pr_bar');
      if (prbar) prbar.style.width = Math.min(100, prPct) + '%';

      show('result-practical');

      const res = document.getElementById('result-practical');
      if (res) res.scrollIntoView({
         behavior: 'smooth',
         block: 'center'
      });
   }

   document.getElementById('calc-practical').addEventListener('click', calcPractical);
   document.getElementById('reset-practical').addEventListener('click', () => {
      ['pr_ws1', 'pr_ws2', 'pr_ws3', 'pr_ws4', 'pr_classperf', 'pr_miniproject', 'pr_industry', 'pr_endpractical'].forEach(id => {
         const el = document.getElementById(id);
         if (el) el.value = '';
         const err = document.getElementById('err-' + id);
         if (err) err.classList.remove('show');
         if (el) el.classList.remove('invalid');
      });
      hide('result-practical');
   });

   hide('result-hybrid');
   hide('result-theory');
   hide('result-practical');

})();


function toggleTheme() {
   document.body.classList.toggle("dark-mode");

   const btn = document.getElementById("themeBtn");

   if (document.body.classList.contains("dark-mode")) {
      btn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
   } else {
      btn.textContent = "🌙";
      localStorage.setItem("theme", "light");
   }
}

document.addEventListener("DOMContentLoaded", () => {
   const btn = document.getElementById("themeBtn");

   const saved = localStorage.getItem("theme");

   if (saved === "dark") {
      document.body.classList.add("dark-mode");
      if (btn) btn.textContent = "☀️";
   }
});

function toggleTheme() {
   document.body.classList.toggle("dark-mode");

   const btn = document.getElementById("themeBtn");

   if (document.body.classList.contains("dark-mode")) {
      if (btn) btn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
   } else {
      if (btn) btn.textContent = "🌙";
      localStorage.setItem("theme", "light");
   }
}
