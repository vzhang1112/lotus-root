import React from 'react';
import DOMPurify from 'dompurify';
import { isValidUrl } from '../utils/validationUtils.js';

const ProfileCard = ({ profile }) => {
    const sanitizedDisplayName = DOMPurify.sanitize(profile.display_name);
    const sanitizedEmail = DOMPurify.sanitize(profile.email);
    const sanitizedLinkedInUrl = DOMPurify.sanitize(profile.linkedin_url);

    return (
        <div className="group shadow-lg flex rounded-lg max-w-xs flex-col overflow-hidden border border-outline bg-surface-alt text-on-surface dark:border-outline-dark dark:bg-surface-dark-alt dark:text-on-surface-dark">
            {/* <!-- Images --> */}
            <div className="relative h-36">
                <img src="https://penguinui.s3.amazonaws.com/component-assets/card-img-5.gif" className="h-full w-full object-cover" alt="cover" />
                <div className="relative z-10 mx-auto -mt-14 size-28 overflow-hidden rounded-[100%] border-4 border-surface-alt dark:border-surface-dark-alt">
                    {/* <!-- The 3D avatar is generated by AI using https://perchance.org/ai-character-generator with the art style of 'Cute 3D Icon'. --> */}
                    <img src="https://penguinui.s3.amazonaws.com/component-assets/3d-avatar-1.webp" className="h-full object-cover transition duration-700 ease-out group-hover:scale-105" alt="avatar" />
                </div>
            </div>
            {/* <!-- Body --> */}
            <div className="flex flex-col gap-2 p-6 text-center mt-12">
                <h3 className="text-balance text-xl font-bold text-on-surface-strong lg:text-2xl dark:text-on-surface-dark-strong" aria-describedby="profileDescription">{sanitizedDisplayName}</h3>
                <span className="mx-auto w-fit bg-primary px-2 py-1 text-xs text-invert dark:bg-primary-dark dark:text-on-primary-dark rounded-radius">{profile.hr_focus.toUpperCase()} {profile.grad_year}</span>
                <p>Working in the {profile.industry} industry at {profile.company} as a {profile.position}</p>

                {/* <!-- Social Links --> */}
                <div className="mt-4 flex items-center justify-center gap-6">
                    {/* <!-- Email --> */}
                    {profile.share_email && (
                        <a href={`mailto:${sanitizedEmail}`} className="text-on-surface hover:text-primary dark:text-on-surface-dark dark:hover:text-primary-dark" aria-label="email">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7 shrink-0">
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                        </a>
                    )}
                    {/* <!-- Linkedin --> */}
                    {profile.linkedin_url && isValidUrl(sanitizedLinkedInUrl, 'linkedin.com') && (
                        <a href={sanitizedLinkedInUrl} target="_blank" rel="noopener noreferrer" className="text-on-surface hover:text-primary dark:text-on-surface-dark dark:hover:text-primary-dark" aria-label="linkedin">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-6 shrink-0">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;