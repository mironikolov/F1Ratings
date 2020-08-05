using Microsoft.EntityFrameworkCore.Migrations;

namespace F1Ratings.Migrations
{
    public partial class AddDefaultRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'ff058666-db38-456a-8384-f3682e3da89b', N'Default', N'DEFAULT', N'5ec11e35-aa14-461b-ac55-671ff0cebde7')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
