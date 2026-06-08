---
# Leave the homepage title empty to use the site title
title: ''
summary: ''
date: 2022-10-24
type: landing

sections:
  - block: resume-biography
    content:
      # The author profile is defined in `data/authors/me.yaml`.
      username: me
      # Call-to-action button under the biography (links to the full CV).
      button:
        text: Full CV
        url: about/
    design:
      # Use the new Gradient Mesh which automatically adapts to the selected theme colors
      background:
        gradient_mesh:
          enable: true
      # Name heading sizing to accommodate long or short names
      name:
        size: md # Options: xs, sm, md, lg (default), xl
      # Avatar customization
      avatar:
        size: medium # Options: small (150px), medium (200px, default), large (320px), xl (400px), xxl (500px)
        shape: circle # Options: circle (default), square, rounded

  # Interests are kept in `data/authors/me.yaml` for the record, but the
  # `resume-biography` header above does not render them, so they are listed
  # here. (Using `resume-biography-3` instead would also show education, which
  # belongs on the About page.)
  - block: markdown
    content:
      title: Interests
      text: |
        - Artificial Intelligence
        - Autonomous Underwater Vehicles
        - Robot Navigation & Localization
        - Target Tracking
        - Probabilistic Methods
---
