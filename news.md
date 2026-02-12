---
layout: page
title: News
permalink: /news/
---

## News

Stay updated with the latest from Cambridge University Photography Society!

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts %}
  <li>
    <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    {% if post.excerpt %}
    <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}
*Check back soon for news and updates!*
{% endif %}
