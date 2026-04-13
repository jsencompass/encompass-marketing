# Encompass Marketing — Email Templates

## Overview

Two transactional email templates, both sent via Resend from `noreply@send.encompassparking.com`.

## contactInternal

**File**: `src/lib/email/templates/contactInternal.ts`
**Trigger**: Contact form submission on /contact
**To**: `CONTACT_TO_EMAIL` (contact@encompassparking.com)
**Reply-To**: Submitter's email address
**Subject**: `New engagement request — [Organization or Name]`
**Content**: Structured table with all form fields + message body
**Preview line**: `New engagement request from [Name] ([Organization]) — [Portfolio size]`

## contactAcknowledgement

**File**: `src/lib/email/templates/contactAcknowledgement.ts`
**Trigger**: Same contact form submission (sent in parallel with internal)
**To**: Submitter's email address
**From**: `Encompass <noreply@send.encompassparking.com>`
**Reply-To**: `CONTACT_TO_EMAIL` (so submitter replies route to contact@)
**Subject**: `We received your request — Encompass Parking`

**Tone guidance**: Warm, direct, never auto-responder-feeling. Written in first-person plural ("we"). Mentions the engagement process (PPB → PACT Oversight) so the submitter understands what to expect. Commits to one-business-day reply.

**HTML treatment**: 8px accent bar header, system-ui body at 16px/1.6, max-width 580px, small-caps footer with "ENCOMPASS PARKING, LLC · LOS ANGELES", privacy/cookie policy links.

**Error handling**: If ack fails but internal succeeds, the user still sees on-screen success. Failure is logged with redacted email: `{email: "[REDACTED]", error: "..."}`.

## Editing

To modify template copy: edit the respective `.ts` file in `src/lib/email/templates/`, rebuild, and deploy. No CMS or external dependency.
