---
title: Publications
cms_exclude: true
type: landing

sections:
  - block: collection
    content:
      title: Journal Articles
      filters:
        folders:
          - publications
        publication_types:
          - 'article-journal'
    design:
      view: citation

  - block: collection
    content:
      title: Conference Papers
      filters:
        folders:
          - publications
        publication_types:
          - 'paper-conference'
    design:
      view: citation

  - block: collection
    content:
      title: Technical Reports
      filters:
        folders:
          - publications
        publication_types:
          - 'report'
    design:
      view: citation
---
