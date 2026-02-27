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
      title: "Homepage",
      url: "/",
      description: "Main landing page with featured products and hero section",
      status: "Active",
      statusColor: "green",
    },
    {
      title: "Pricing Page",
      url: "/pricing",
      description:
        "Contains delivery rates for Lagos/Abuja and nationwide shipping",
      status: "Active",
      statusColor: "green",
    },
    {
      title: "Product Catalog",
      url: "/products",
      description: "Full catalog with categories: watches, accessories, etc.",
      status: "Training",
      statusColor: "yellow",
    },
    {
      title: "Contact Page",
      url: "/contact",
      description: "Phone, email, WhatsApp, and office address",
      status: "Error",
      statusColor: "red",
    },
  ];

  const mockMissingQuestions = [
    { question: "What is your return policy?", count: 14 },
    { question: "Do you offer warranty on watches?", count: 8 },
    { question: "Can I pay on delivery?", count: 6 },
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

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      navItems.forEach((nav) => nav.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      item.classList.add("active");
      const targetId = item.getAttribute("data-target");

      // Handle support click (dummy action for now)
      if (targetId === "support") {
        alert("Redirecting to Support Portal...");
        return;
      }

      document.getElementById(`pane-${targetId}`).classList.add("active");

      if (targetId === "dashboard") loadDashboard();
      if (targetId === "knowledge") loadKnowledgeBase();
      if (targetId === "inbox") loadInbox();
      if (targetId === "leads") loadLeads();
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
                <td style="font-weight: 600; color: #0f172a;">${lead.name}</td>
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
                <td style="font-weight: 600; color: #0f172a;">${item.title}</td>
                <td style="color: #64748b; font-size: 0.85rem;">${item.url}</td>
                <td><div style="max-width:350px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color: #475569;">${item.description}</div></td>
                <td>
                    <div class="status-badge">
                        <span class="indicator ${item.statusColor}"></span>
                        ${item.status}
                    </div>
                </td>
                <td>
                    <div class="action-icons">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        <svg class="delete" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </div>
                </td>
            </tr>
        `,
      )
      .join("");

    const missingList = document.getElementById("missingInfoList");
    missingList.innerHTML = mockMissingQuestions
      .map(
        (item) => `
            <div class="missing-item">
                <div class="missing-item-content">
                    <strong>"${item.question}"</strong>
                    <span>Asked ${item.count} times</span>
                </div>
                <button class="btn btn-outline" style="font-size:0.8rem; padding: 6px 12px; gap:4px;">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg> Add Page
                </button>
            </div>
        `,
      )
      .join("");
  }

  function loadLeads() {
    const tbody = document.getElementById("leadsTableBody");
    tbody.innerHTML = mockLeads
      .map((lead) => {
        let activeClass = lead.status === "New" ? "active" : "";
        return `
            <tr>
                <td style="font-weight: 600; color: #0f172a;">${lead.name}</td>
                <td>${lead.phone}</td>
                <td><span class="nav-badge" style="background:${lead.status === "New" ? "#dcfce7" : "#e2e8f0"}; color:${lead.status === "New" ? "#166534" : "#475569"}">${lead.status}</span></td>
                <td style="color:#64748b; font-size:0.85rem">${lead.date}</td>
            </tr>
        `;
      })
      .join("");
  }

  function loadInbox() {
    const list = document.getElementById("inboxList");
    list.innerHTML = mockConversations
      .map((cv) => {
        let tagHtml =
          cv.tag === "hot"
            ? '<span class="nav-badge" style="background:#fee2e2;color:#ef4444">Hot Lead</span>'
            : '<span class="nav-badge" style="background:#fef3c7;color:#d97706">Warm</span>';
        return `
            <div class="convo-item" data-id="${cv.id}">
                <div class="convo-header">
                    <span>${cv.name}</span>
                    <span style="font-size:0.75rem; color:#64748b; font-weight:normal;">${cv.date}</span>
                </div>
                <div class="convo-preview">${cv.preview}</div>
                <div class="convo-tags" style="margin-top:8px">${tagHtml}</div>
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
                    <div class="chat-bubble bot">Great question. We can certainly handle that right away. Let me get you the correct pricing link.</div>
                `;
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

  document.getElementById("saveSettingsBtn")?.addEventListener("click", () => {
    const btn = document.getElementById("saveSettingsBtn");
    btn.textContent = "Saved!";
    setTimeout(() => (btn.textContent = "Save Settings"), 2000);
  });

  // Init Data
  loadDashboard();
});
