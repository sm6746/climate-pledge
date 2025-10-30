import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Search } from "lucide-react";
import { getPledges } from "@/lib/pledgeService";

interface Pledge {
  id: string;
  name: string;
  date: string;
  state: string;
  profileType: string;
  commitmentCount: number;
}

const PledgeWall = () => {
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPledges = async () => {
      try {
        const data = await getPledges();
        setPledges(data);
      } catch (err) {
        console.error('Error loading pledges:', err);
        setError('Failed to load pledges. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPledges();
  }, []);

  const filteredPledges = pledges.filter(pledge => {
    const matchesSearch = pledge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pledge.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || pledge.profileType === filterType;
    return matchesSearch && matchesFilter;
  });

  const getHeartRating = (count: number) => {
    const hearts = Math.min(5, Math.ceil(count / 2));
    return Array.from({ length: hearts }).map((_, i) => (
      <Heart key={i} className="h-4 w-4 text-red-500 fill-red-500 inline" />
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-emerald-50/30 via-background to-sky-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-medium text-sm mb-6">
              <Heart className="w-4 h-4 fill-current" />
              <span>Our Community</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Community Pledge Wall
            </h2>
            <p className="text-lg text-muted-foreground">
              Celebrating everyone who's committed to climate action
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="md:w-64">
                <SelectValue placeholder="Filter by profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Profiles</SelectItem>
                <SelectItem value="Student">Students</SelectItem>
                <SelectItem value="Working Professional">Professionals</SelectItem>
                <SelectItem value="Other">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pledge Table */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">State</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Profile</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">❤️ Love for Planet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        Loading pledges...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        {error}
                      </td>
                    </tr>
                  ) : filteredPledges.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                        {pledges.length === 0 
                          ? "Be the first to take the pledge!" 
                          : "No pledges match your search criteria"}
                      </td>
                    </tr>
                  ) : (
                    filteredPledges.map((pledge) => (
                      <tr key={pledge.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                          #{pledge.id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          {pledge.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {pledge.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {pledge.state || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {pledge.profileType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            {getHeartRating(pledge.commitmentCount)}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {filteredPledges.length > 0 && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Showing {filteredPledges.length} of {pledges.length} pledges
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PledgeWall;
