import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/Auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Phone, FileText, CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface LabBooking {
  id: string;
  farmer_id: string;
  test_type: string;
  sample_type: string;
  preferred_date: string;
  preferred_time: string;
  farmer_contact: string;
  status: string;
  notes?: string;
  created_at: string;
  farmer_profile?: {
    full_name: string;
    phone?: string;
    farm_location?: string;
  };
}

const LabDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<LabBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('pending');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is a laboratory
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('lab_bookings')
        .select(`
          *,
          farmer_profile:profiles!lab_bookings_farmer_id_fkey(
            full_name,
            phone,
            farm_location
          )
        `)
        .eq('lab_id', user?.email) // Assuming lab_id matches user email
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('lab_bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );

      toast.success(`Booking ${status} successfully`);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'default',
      confirmed: 'secondary',
      completed: 'outline',
      cancelled: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredBookings = bookings.filter(booking => {
    if (selectedTab === 'all') return true;
    return booking.status === selectedTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Laboratory Dashboard</h1>
              <p className="text-muted-foreground">Manage your booking requests</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({bookings.filter(b => b.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({bookings.filter(b => b.status === 'completed').length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            {filteredBookings.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                  <p className="text-muted-foreground text-center">
                    {selectedTab === 'all' 
                      ? 'No booking requests have been made yet.'
                      : `No ${selectedTab} bookings at the moment.`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            {booking.farmer_profile?.full_name || 'Unknown Farmer'}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {booking.farmer_contact}
                            </span>
                            {booking.farmer_profile?.farm_location && (
                              <span>📍 {booking.farmer_profile.farm_location}</span>
                            )}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {getStatusBadge(booking.status)}
                          <span className="text-xs text-muted-foreground">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Test Type</h4>
                          <p className="text-muted-foreground">{booking.test_type}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Sample Type</h4>
                          <p className="text-muted-foreground">{booking.sample_type}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Preferred Date & Time
                          </h4>
                          <p className="text-muted-foreground">
                            {new Date(booking.preferred_date).toLocaleDateString()} 
                            <span className="flex items-center gap-1 mt-1">
                              <Clock className="h-4 w-4" />
                              {booking.preferred_time}
                            </span>
                          </p>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-sm mb-1">Additional Notes</h4>
                          <p className="text-muted-foreground text-sm bg-muted/50 p-3 rounded">
                            {booking.notes}
                          </p>
                        </div>
                      )}

                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Accept Booking
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      )}

                      {booking.status === 'confirmed' && (
                        <Button
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          variant="secondary"
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark as Completed
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LabDashboard;