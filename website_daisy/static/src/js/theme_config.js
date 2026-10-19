/** @odoo-module **/

import { registry } from "@web/core/registry";
import { patch } from "@web/core/utils/patch";
import { SelectionField } from "@web/views/fields/selection/selection_field";

// Inject Google Fonts for typography live-switching
try {
    if (typeof document !== "undefined" && !document.getElementById("daisy_google_fonts")) {
        const fontLink = document.createElement("link");
        fontLink.id = "daisy_google_fonts";
        fontLink.rel = "stylesheet";
        fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap";
        document.head.appendChild(fontLink);
    }
} catch (e) {}

// Immediately apply cached theme settings from localStorage to eliminate FOUC
try {
    let cachedScheme = localStorage.getItem("daisy_color_scheme") || "light";
    if (cachedScheme === "contrast") {
        cachedScheme = "light";
        localStorage.setItem("daisy_color_scheme", "light");
    }
    const cachedTheme = localStorage.getItem("daisy_theme_color") || "indigo";
    const cachedRadius = localStorage.getItem("daisy_border_radius") || "modern";
    const cachedCard = localStorage.getItem("daisy_card_style") || "floating";
    const cachedFont = localStorage.getItem("daisy_font_family") || "jakarta";
    const cachedSidebar = localStorage.getItem("daisy_sidebar_style") || "expanded";

    document.documentElement.setAttribute("data-daisy-scheme", cachedScheme);
    if (cachedScheme === "dark") {
        document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-bs-theme");
    }
    document.documentElement.setAttribute("data-daisy-theme", cachedTheme);
    document.documentElement.setAttribute("data-daisy-radius", cachedRadius);
    document.documentElement.setAttribute("data-daisy-card", cachedCard);
    document.documentElement.setAttribute("data-daisy-font", cachedFont);
    document.documentElement.setAttribute("data-daisy-sidebar", cachedSidebar);
} catch (e) {
    // localStorage unavailable
}

// Patch SelectionField to enable instant real-time live preview when toggling Daisy Theme settings
patch(SelectionField.prototype, {
    onChange(value) {
        super.onChange(...arguments);
        if (this.props && this.props.name && this.props.name.startsWith("daisy_")) {
            const fieldName = this.props.name;
            const val = value || false;
            if (val) {
                const settingMap = {
                    daisy_color_scheme: "scheme",
                    daisy_theme_color: "theme",
                    daisy_card_style: "card",
                    daisy_border_radius: "radius",
                    daisy_font_family: "font",
                    daisy_sidebar_style: "sidebar",
                };
                const configKey = settingMap[fieldName];
                if (configKey && window.daisySetTheme) {
                    window.daisySetTheme({ [configKey]: val });
                } else if (configKey) {
                    const attrMap = {
                        scheme: "data-daisy-scheme",
                        theme: "data-daisy-theme",
                        card: "data-daisy-card",
                        radius: "data-daisy-radius",
                        font: "data-daisy-font",
                        sidebar: "data-daisy-sidebar",
                    };
                    const storageMap = {
                        scheme: "daisy_color_scheme",
                        theme: "daisy_theme_color",
                        card: "daisy_card_style",
                        radius: "daisy_border_radius",
                        font: "daisy_font_family",
                        sidebar: "daisy_sidebar_style",
                    };
                    document.documentElement.setAttribute(attrMap[configKey], val);
                    if (configKey === "scheme") {
                        if (val === "dark") {
                            document.documentElement.setAttribute("data-bs-theme", "dark");
                        } else {
                            document.documentElement.removeAttribute("data-bs-theme");
                        }
                    }
                    localStorage.setItem(storageMap[configKey], val);
                }
            }
        }
    },
});

export const daisyThemeService = {
    dependencies: ["orm"],
    async start(env, { orm }) {
        async function applyThemeConfig() {
            try {
                const [scheme, color, card, radius, font, sidebar] = await Promise.all([
                    orm.call("ir.config_parameter", "get_param", ["website_daisy.color_scheme", "light"]),
                    orm.call("ir.config_parameter", "get_param", ["website_daisy.theme_color", "indigo"]),
                    orm.call("ir.config_parameter", "get_param", ["website_daisy.card_style", "floating"]),
                    orm.call("ir.config_parameter", "get_param", ["website_daisy.border_radius", "modern"]),
                    orm.call("ir.config_parameter", "get_param", ["website_daisy.font_family", "jakarta"]),
                    orm.call("ir.config_parameter", "get_param", ["website_daisy.sidebar_style", "expanded"]),
                ]);

                let activeScheme = scheme || "light";
                if (activeScheme === "contrast") {
                    activeScheme = "light";
                }
                const activeColor = color || "indigo";
                const activeCard = card || "floating";
                const activeRadius = radius || "modern";
                const activeFont = font || "jakarta";
                const activeSidebar = sidebar || "expanded";

                document.documentElement.setAttribute("data-daisy-scheme", activeScheme);
                if (activeScheme === "dark") {
                    document.documentElement.setAttribute("data-bs-theme", "dark");
                } else {
                    document.documentElement.removeAttribute("data-bs-theme");
                }
                document.documentElement.setAttribute("data-daisy-theme", activeColor);
                document.documentElement.setAttribute("data-daisy-card", activeCard);
                document.documentElement.setAttribute("data-daisy-radius", activeRadius);
                document.documentElement.setAttribute("data-daisy-font", activeFont);
                document.documentElement.setAttribute("data-daisy-sidebar", activeSidebar);

                // Cache for zero-latency subsequent loads
                try {
                    localStorage.setItem("daisy_color_scheme", activeScheme);
                    localStorage.setItem("daisy_theme_color", activeColor);
                    localStorage.setItem("daisy_card_style", activeCard);
                    localStorage.setItem("daisy_border_radius", activeRadius);
                    localStorage.setItem("daisy_font_family", activeFont);
                    localStorage.setItem("daisy_sidebar_style", activeSidebar);
                } catch (e) {}
            } catch (e) {
                console.warn("[DaisyTheme] Error loading theme parameters:", e);
            }
        }

        // Live runtime switcher API for immediate preview
        window.daisySetTheme = async function (config = {}) {
            if (config.scheme) {
                document.documentElement.setAttribute("data-daisy-scheme", config.scheme);
                if (config.scheme === "dark") {
                    document.documentElement.setAttribute("data-bs-theme", "dark");
                } else {
                    document.documentElement.removeAttribute("data-bs-theme");
                }
                localStorage.setItem("daisy_color_scheme", config.scheme);
                orm.call("ir.config_parameter", "set_param", ["website_daisy.color_scheme", config.scheme]).catch(() => {});
            }
            if (config.theme) {
                document.documentElement.setAttribute("data-daisy-theme", config.theme);
                localStorage.setItem("daisy_theme_color", config.theme);
                orm.call("ir.config_parameter", "set_param", ["website_daisy.theme_color", config.theme]).catch(() => {});
            }
            if (config.card) {
                document.documentElement.setAttribute("data-daisy-card", config.card);
                localStorage.setItem("daisy_card_style", config.card);
                orm.call("ir.config_parameter", "set_param", ["website_daisy.card_style", config.card]).catch(() => {});
            }
            if (config.radius) {
                document.documentElement.setAttribute("data-daisy-radius", config.radius);
                localStorage.setItem("daisy_border_radius", config.radius);
                orm.call("ir.config_parameter", "set_param", ["website_daisy.border_radius", config.radius]).catch(() => {});
            }
            if (config.font) {
                document.documentElement.setAttribute("data-daisy-font", config.font);
                localStorage.setItem("daisy_font_family", config.font);
                orm.call("ir.config_parameter", "set_param", ["website_daisy.font_family", config.font]).catch(() => {});
            }
            if (config.sidebar) {
                document.documentElement.setAttribute("data-daisy-sidebar", config.sidebar);
                localStorage.setItem("daisy_sidebar_style", config.sidebar);
                orm.call("ir.config_parameter", "set_param", ["website_daisy.sidebar_style", config.sidebar]).catch(() => {});
            }
        };

        window.daisyApplyTheme = applyThemeConfig;

        // Auto re-sync when saving settings
        document.addEventListener("click", (e) => {
            const saveBtn = e.target.closest('button[name="execute"], .o_form_button_save');
            if (saveBtn) {
                setTimeout(() => {
                    applyThemeConfig();
                }, 1200);
            }
        }, true);

        applyThemeConfig();
        return { applyThemeConfig };
    },
};

registry.category("services").add("daisy_theme", daisyThemeService);
