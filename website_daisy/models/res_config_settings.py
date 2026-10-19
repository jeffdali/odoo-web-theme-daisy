# -*- coding: utf-8 -*-
from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    daisy_color_scheme = fields.Selection([
        ('light', 'Studio Light (Apple / Radix Pro)'),
        ('dark', 'Midnight OLED Dark (Linear / Vercel Pro)'),
    ], string="Appearance Color Scheme", config_parameter='website_daisy.color_scheme', default='light')

    daisy_theme_color = fields.Selection([
        ('indigo', 'Electric Indigo (Linear Dual-Tone)'),
        ('emerald', 'Emerald Luxe (Supabase Green)'),
        ('sky', 'Cyber Cyan & Sky (Docker / Tailwind)'),
        ('violet', 'Velvet Royal Violet (Raycast)'),
        ('rose', 'Sunset Rose & Coral (Stripe)'),
        ('amber', 'Sunburst Amber Gold (Solana)'),
        ('slate', 'Titanium Monochrome (Apple Pro)'),
    ], string="Brand Accent & Gradient", config_parameter='website_daisy.theme_color', default='indigo')

    daisy_card_style = fields.Selection([
        ('floating', 'Floating Elevation (Multi-Stop Shadows)'),
        ('glass', 'Glassmorphic Frosted (Backdrop Blur)'),
        ('bordered', 'Crisp Minimalist (Linear 1px Borders)'),
    ], string="Card & Surface Elevation", config_parameter='website_daisy.card_style', default='floating')

    daisy_border_radius = fields.Selection([
        ('sharp', 'Sharp (4px)'),
        ('modern', 'Modern (8px - Default)'),
        ('smooth', 'Smooth Curved (12px)'),
    ], string="UI Corner Radius", config_parameter='website_daisy.border_radius', default='modern')

    daisy_font_family = fields.Selection([
        ('jakarta', 'Plus Jakarta Sans (Default)'),
        ('inter', 'Inter'),
        ('outfit', 'Outfit Modern'),
        ('roboto', 'Roboto Classic'),
    ], string="Typography Font", config_parameter='website_daisy.font_family', default='jakarta')

    daisy_sidebar_style = fields.Selection([
        ('expanded', 'Expanded Modern (320px)'),
        ('compact', 'Compact Classic (240px)'),
    ], string="Application Drawer Style", config_parameter='website_daisy.sidebar_style', default='expanded')
