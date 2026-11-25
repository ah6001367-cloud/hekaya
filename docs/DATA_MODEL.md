# Hekaya backend data model (design only, not built)

Planned for the Firebase accounts work. Today everything is local (localStorage / IndexedDB).

## Local keys already in use (client)
- hk_u: unlocked story numbers. hk_s: solved riddle numbers. hk_ev: unlock events [{n, t(ms), sd}].
- hk_rc: finished featured routes. hk_my / hk_mc: personal route and count.
- hk_fam: family mode. hk_memc: memory count. Photos live in IndexedDB "hk_mem" (never uploaded).

## users/{uid}
displayName, photoURL?, createdAt, lang, family (bool),
progress: { unlocked: [n], solved: [n], routes: [id], myRoutes: int, badges: {key: ts} },
stats: { stories, riddles, badgeCount, lastActive }  // the only fields a leaderboard reads
privacy: { leaderboard: "off" | "friends" , showName: bool }  // default "off"

## friends/{uid}/list/{friendUid}
status: "pending" | "accepted", createdAt  // friend code or invite link, no phone book access

## leaderboard (read via friends only)
Query: stats of accepted friends, ordered by stories then riddles. Only counts, never locations.

## placeSuggestions/{id}  (item 5)
uid, createdAt, name, note, lat, lon, category, sources: [url], photo?: (user-owned, license ack),
status: "new" | "reviewing" | "accepted" | "rejected", reviewerNote
Rules: signed-in users create; only the owner reads their own; admin reads all. Accepted ones become story drafts (documented sources required).

## Security rules sketch
users/{uid}: read/write only by uid. friends: both parties. placeSuggestions: create by auth, read by owner/admin.
Never store GPS traces. Location stays on the device.
