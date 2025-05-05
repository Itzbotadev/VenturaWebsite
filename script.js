function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    lucide.createIcons(); // Refresh icons
  }
  
  function loginDiscord() {
    alert('Redirecting to Discord login...');
    localStorage.setItem('isAdmin', 'true');
    updateAdminSection();
  }
  
  function updateAdminSection() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminPanel = document.getElementById('admin-section');
    if (isAdmin) {
      adminPanel.innerHTML = `
        <p><strong>Admin Actions:</strong></p>
        <button class="btn-glow" onclick="alert('Mods wiped')"><i data-lucide="trash-2"></i> Wipe Mods</button>
        <button class="btn-glow" onclick="alert('Server restarting')"><i data-lucide="refresh-ccw"></i> Restart Server</button>
      `;
      lucide.createIcons();
    }
  }
  
  function uploadMod() {
    const file = document.getElementById('mod-file').files[0];
    if (!file) return alert('Choose a file first!');
    alert(`Uploaded mod: ${file.name}`);
    
    
  }
  
  function downloadLoadout() {
    const content = document.getElementById('loadout-json').value;
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "PlayerStash.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  window.onload = () => {
    const mods = ['Scoped Rifle Mod', 'Jungle Camo Pack', 'Tactical Gear'];
    const grid = document.getElementById('mod-list');
    mods.forEach(name => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<strong>${name}</strong><br/><small>Uploaded by user</small>`;
      grid.appendChild(card);
    });
    updateAdminSection();
    lucide.createIcons();
  };
document.getElementById("file-form").onsubmit = function(event) {
    event.preventDefault();  // Prevent the default form submission

    const formData = new FormData();
    const fileInput = document.getElementById("file");

    formData.append("file", fileInput.files[0]);

    fetch("https://your-replit-username.replit.app/upload", {
      method: "POST",
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      alert("File uploaded successfully!");
    })
    .catch(error => {
      alert("Error uploading file.");
    });
  };
  document.getElementById('mod-file').addEventListener('change', (e) => {
    const name = e.target.files[0]?.name || "No file selected";
    document.querySelector('.file-upload span').innerHTML = `<i data-lucide="file"></i> ${name}`;
    lucide.createIcons();
  });

  
