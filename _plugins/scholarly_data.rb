# Exposes the peer-reviewed entries of the bibliography as site.data["scholarly"],
# used to emit ScholarlyArticle structured data (JSON-LD) on the Publications page.
require "bibtex"

module SiteSEO
  class ScholarlyData < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      path = File.join(site.source, "_bibliography", "publications.bib")
      return unless File.exist?(path)

      bib = BibTeX.open(path, filter: :latex)
      site.data["scholarly"] = bib.each.select { |e| %i[article inproceedings].include?(e.type) }.map do |e|
        {
          "type"    => e.type.to_s,
          "title"   => e[:title].to_s,
          "authors" => e.author.map { |a| [a.first, a.prefix, a.last].compact.join(" ") },
          "year"    => e[:year].to_s,
          "venue"   => (e[:journal] || e[:booktitle]).to_s,
          "doi"     => e[:doi]&.to_s,
        }
      end.sort_by { |p| -p["year"].to_i }
    end
  end
end
