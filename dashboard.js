document.addEventListener("DOMContentLoaded", () => {
  // --- Mock Data ---
  const mockLeads = [
    {
      name: "Amina O.",
      phone: "+234 901 234 5678",
      status: "New",
      date: "Today, 10:45 AM",
    },
    {
      name: "Chidi K.",
      phone: "+234 803 456 7890",
      status: "Contacted",
      date: "Yesterday, 2:15 PM",
    },
    {
      name: "Ngozi A.",
      phone: "+234 705 678 9012",
      status: "New",
      date: "Feb 24, 9:00 AM",
    },
    {
      name: "Emeka D.",
      phone: "+234 812 345 6789",
      status: "Closed",
      date: "Feb 21, 4:30 PM",
    },
  ];

  const mockKnowledge = [
    {
      title: "Home Page",
      context: "Main landing page explaining the AI widget.",
      status: "Active",
    },
    {
      title: "Pricing Page",
      context: "Plans: Basic $29, Pro $79, Scale $199.",
      status: "Active",
    },
    {
      title: "Return Policy",
      context: "30 day return window for non-custom items.",
      status: "Active",
    },
  ];

  const mockConversations = [
    {
      id: 1,
      name: "Amina O.",
      preview: "How much is shipping to Lagos?",
      score: 9,
      tag: "hot",
      date: "10:45 AM",
    },
    {
      id: 2,
      name: "Unknown Visitor",
      preview: "Do you offer custom integrations?",
      score: 6,
      tag: "warm",
      date: "9:20 AM",
    },
    {
      id: 3,
      name: "Chidi K.",
      preview: "I want to upgrade my plan.",
      score: 8,
      tag: "hot",
      date: "Yesterday",
    },
  ];

  // --- Navigation Logic ---
  const navItems = document.querySelectorAll(".nav-item");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const pageTitle = document.getElementById("pageTitle");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      navItems.forEach((nav) => nav.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      item.classList.add("active");
      const targetId = item.getAttribute("data-target");
      document.getElementById(`pane-${targetId}`).classList.add("active");
      pageTitle.textContent = item.textContent
        .replace(/[^a-zA-Z &]/g, "")
        .trim();

      if (targetId === "dashboard") loadDashboard();
      if (targetId === "knowledge") loadKnowledgeBase();
      if (targetId === "inbox") loadInbox();
      if (targetId === "leads") loadLeads();
      if (targetId === "settings") updateWidgetPreview();
    });
  });

  // --- Renders ---
  function loadDashboard() {
    document.getElementById("kpiConversations").textContent = "1,245";
    document.getElementById("kpiAnswered").textContent = "2,490";
    document.getElementById("kpiLeads").textContent = "142";
    document.getElementById("kpiTimeSaved").textContent = "41.5";

    const tbody = document.getElementById("dashboardLeadsTableBody");
    tbody.innerHTML = mockLeads
      .slice(0, 3)
      .map(
        (lead) => `
            <tr>
                <td style="font-weight: 500;">${lead.name}</td>
                <td>${lead.phone}</td>
                <td style="color:#64748b; font-size:0.85rem">${lead.date}</td>
            </tr>
        `,
      )
      .join("");
  }

  function loadKnowledgeBase() {
    const tbody = document.getElementById("kbTableBody");
    tbody.innerHTML = mockKnowledge
      .map(
        (item) => `
            <tr>
                <td><strong>${item.title}</strong></td>
                <td><div style="max-width:300px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.context}</div></td>
                <td><span class="badge active">${item.status}</span></td>
            </tr>
        `,
      )
      .join("");
  }

  function loadLeads() {
    const tbody = document.getElementById("leadsTableBody");
    tbody.innerHTML = mockLeads
      .map(
        (lead) => `
            <tr>
                <td style="font-weight: 500;">${lead.name}</td>
                <td>${lead.phone}</td>
                <td><span class="badge ${lead.status === "New" ? "active" : ""}">${lead.status}</span></td>
                <td style="color:#64748b; font-size:0.85rem">${lead.date}</td>
            </tr>
        `,
      )
      .join("");
  }

  function loadInbox() {
    const list = document.getElementById("inboxList");
    list.innerHTML = mockConversations
      .map((cv) => {
        let tagHtml =
          cv.tag === "hot"
            ? '<span class="tag hot">🔥 Hot</span> <span class="tag active">Lead</span>'
            : '<span class="tag warm">⭐ Warm</span>';
        return `
            <div class="convo-item" data-id="${cv.id}">
                <div class="convo-header">
                    <span>${cv.name}</span>
                    <span style="font-size:0.75rem; color:#64748b; font-weight:normal;">${cv.date}</span>
                </div>
                <div class="convo-preview">${cv.preview}</div>
                <div class="convo-tags">${tagHtml}</div>
            </div>`;
      })
      .join("");

    document.querySelectorAll(".convo-item").forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelectorAll(".convo-item")
          .forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        // Show fake chat
        document.getElementById("inboxChat").innerHTML = `
                    <div class="chat-bubble user">Hey, I have a question about my website.</div>
                    <div class="chat-bubble bot">Hello! I'd be happy to help. What do you need to know?</div>
                    <div class="chat-bubble user">${mockConversations.find((c) => c.id == item.getAttribute("data-id")).preview}</div>
                    <div class="chat-bubble bot">Great question. We can certainly handle that.</div>
                `;

        // Show metadata
        const conv = mockConversations.find(
          (c) => c.id == item.getAttribute("data-id"),
        );
        document.getElementById("inboxMetadata").style.display = "block";
        document.getElementById("metaFirstSeen").textContent = conv.date;
        document.getElementById("metaLeadName").textContent = conv.name;
        document.getElementById("metaLeadScore").textContent =
          conv.score + "/10";
        document.getElementById("metaLeadPhone").textContent =
          conv.name.includes("Unknown") ? "--" : "+234 *** ****";
      });
    });
  }

  // --- Settings / UX ---
  const addKbBtn = document.getElementById("addKbBtn");
  const cancelKbBtn = document.getElementById("cancelKbBtn");
  const addKbForm = document.getElementById("addKbForm");

  addKbBtn.addEventListener("click", () =>
    addKbForm.classList.remove("hidden"),
  );
  cancelKbBtn.addEventListener("click", () =>
    addKbForm.classList.add("hidden"),
  );

  document
    .getElementById("settingColorPicker")
    .addEventListener("input", (e) => {
      document.getElementById("settingColorHex").value = e.target.value;
      updateWidgetPreview();
    });

  document.getElementById("saveSettingsBtn").addEventListener("click", () => {
    const btn = document.getElementById("saveSettingsBtn");
    btn.textContent = "Saved!";
    updateWidgetPreview();
    setTimeout(() => (btn.textContent = "Save Settings"), 2000);
  });

  function updateWidgetPreview() {
    const container = document.getElementById("widgetPreviewContainer");
    const botName = document.getElementById("settingBotName").value;
    const brandColor = document.getElementById("settingColorHex").value;
    const welcomeMessage = document.getElementById("settingWelcome").value;

    container.innerHTML = `
            <div style="position:absolute; bottom:20px; right:20px; width:300px; height:400px; background:white; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.15); display:flex; flex-direction:column; overflow:hidden; border:1px solid #e2e8f0; transform: scale(0.85); transform-origin: bottom right;">
                <div style="background:${brandColor}; color:white; padding:16px; font-weight:600; font-size:16px; display:flex; align-items:center; gap:10px;">
                    <div style="width:24px; height:24px; background:rgba(255,255,255,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px;">🤖</div>
                    ${botName}
                </div>
                <div style="flex:1; background:#f8fafc; padding:16px;">
                    <div style="background:white; padding:12px; border-radius:12px; border-bottom-left-radius:2px; font-size:13px; color:#334155; box-shadow:0 1px 2px rgba(0,0,0,0.05); display:inline-block;">
                        ${welcomeMessage}
                    </div>
                </div>
                <div style="padding:12px; background:white; border-top:1px solid #e2e8f0; display:flex; gap:8px;">
                    <div style="flex:1; padding:8px 12px; border:1px solid #cbd5e1; border-radius:20px; color:#94a3b8; font-size:12px;">Type a message...</div>
                    <div style="width:34px; height:34px; background:${brandColor}; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:12px;">➤</div>
                </div>
            </div>
        `;
  }

  // Init
  loadDashboard();
  updateWidgetPreview();
});
