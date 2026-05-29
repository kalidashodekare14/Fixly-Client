import Profile from '@/components/dashboard/User/Profile';

const userProfile = {
  image: 'https://randomuser.me/api/portraits/men/75.jpg',
  name: 'Mehedi Hasan',
  email: 'mehedi.hasan@example.com',
  role: 'provider' as const,
  phone: '+880 1712-345678',
  address: 'Kaliganj, Dhaka, Bangladesh',
  bio: 'Experienced home service provider specializing in electrical repair, AC servicing, and general maintenance. Dedicated to fast and reliable service.',
  isVerified: true,
  averageRating: 4.8,
  totalReviews: 124,
};

const ProfilePage = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
