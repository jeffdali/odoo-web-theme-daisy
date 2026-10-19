# -*- encoding: utf-8 -*-
{
    'name': 'Odoo Web Theme Daisy',
    'summary': 'Clean, modern web and backend theme for Odoo 19 with OLED Dark & Studio Light modes.',
    'description': """
Odoo Web Theme Daisy
====================

A comprehensive, state-of-the-art theme inspired by modern design systems (shadcn/ui, Radix UI, Linear, and Vercel):

Key Highlights:
---------------
* **Studio Light & Midnight OLED Dark Modes**: Deep contrast dark mode with custom OLED styling and zero eye strain.
* **7 Curated Designer Palettes & Gradients**: Electric Indigo, Emerald Luxe, Cyber Sky, Velvet Violet, Sunset Rose, Sunburst Amber, and Titanium Monochrome.
* **Modern Typography Engine**: Full integration of Google Fonts (Plus Jakarta Sans, Inter, Outfit, and Roboto).
* **Minimalist Elevation Hierarchy**: Crisp 1px borders, subtle multi-stop soft shadows, and accessible focus rings.
* **Complete Redesign for ALL Odoo ERP Components**:
  - Unified Top Navbar & Modern 320px / 240px Application Drawer
  - Modern Data Tables (List View) with Radix status badges & smooth row highlights
  - Kanban Board Cards with depth elevation and tag chips
  - Refined Form Sheets, Stage dropdown pills, and Chatter & Discussion stream
  - Dynamic Search & Filter panels, Systray Activity & Messaging dropdowns
* **Real-time Instant Theme Customizer**: Configure appearance, brand colors, typography, card elevation, and corner radius directly from Odoo Settings with instant live preview.
* **100% Free & Open Source**: Licensed under LGPL-3.
""",
    'category': 'Themes/Backend',
    'version': '19.0.1.0.0',
    'author': 'Jaafar Ali',
    'maintainer': 'Jaafar Ali',
    'license': 'LGPL-3',
    'price': 0.00,
    'currency': 'EUR',
    'depends': ['website', 'web'],
    'data': [
        'data/presets.xml',
        'data/generate_primary_template.xml',
        'views/res_config_settings_views.xml',
    ],
    'assets': {
        'web._assets_primary_variables': [
            'website_daisy/static/src/scss/primary_variables.scss',
        ],
        'web._assets_bootstrap_frontend': [
            'website_daisy/static/src/scss/bootstrap_overridden.scss',
        ],
        'web.assets_frontend': [
            'website_daisy/static/src/scss/theme.scss',
            'website_daisy/static/src/scss/animations.scss',
            'website_daisy/static/src/scss/frontend/snippets.scss',
            'website_daisy/static/src/scss/frontend/portal_auth.scss',
            'website_daisy/static/src/scss/frontend/ecommerce_portal.scss',
            'website_daisy/static/src/js/theme.js',
        ],
        'web.assets_backend': [
            'website_daisy/static/src/js/theme_config.js',
            'website_daisy/static/src/scss/backend/theme_backend.scss',
            'website_daisy/static/src/scss/backend/settings_view.scss',
            'website_daisy/static/src/scss/backend/form_view.scss',
            'website_daisy/static/src/scss/backend/list_view.scss',
            'website_daisy/static/src/scss/backend/kanban_view.scss',
            'website_daisy/static/src/scss/backend/activity_view.scss',
            'website_daisy/static/src/scss/backend/calendar_view.scss',
            'website_daisy/static/src/scss/backend/analytics_view.scss',
            'website_daisy/static/src/scss/backend/search_panel.scss',
            'website_daisy/static/src/scss/backend/fields_widgets.scss',
            'website_daisy/static/src/scss/backend/components.scss',
            'website_daisy/static/src/scss/backend/discuss.scss',
            'website_daisy/static/src/scss/backend/chatter.scss',
            'website_daisy/static/src/scss/backend/overlays_popovers.scss',
            'website_daisy/static/src/xml/navbar.xml',
            'website_daisy/static/src/xml/select_menu.xml',
            'website_daisy/static/src/xml/statusbar.xml',
        ],
    },
    'images': [
        'static/description/cover.png',
        'static/description/screenshot_dashboard.png',
        'static/description/screenshot_kanban_view.png',
        'static/description/screenshot_list_view.png',
        'static/description/screenshot_form_view.png',
        'static/description/screenshot_settings.png',
        'static/description/screenshot_dark_mode.png',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}
