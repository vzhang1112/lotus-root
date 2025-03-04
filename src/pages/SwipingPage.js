import React, { useEffect, useState } from 'react';
import Swiping from '../components/Swiping.js';
import { supabase } from '../utils/supabase.ts';

function SwipingPage() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*');

            if (error) {
                console.error('Error fetching profiles:', error);
            } else {
                setProfiles(data);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div class="body-default">
            <div className="flex min-h-svh items-center justify-center">
                <div className="w-full max-w-sm">
                    <p>Welcome to the swiping page</p>
                    <Swiping profiles={profiles} />
                </div>
            </div>
        </div>
    );
}

export default SwipingPage;